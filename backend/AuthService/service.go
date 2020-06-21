package main

import (
	"context"
	"errors"
	"github.com/loxt/go-blog-app/global"
	"github.com/loxt/go-blog-app/proto"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
	"google.golang.org/grpc"
	"log"
	"net"
	"time"
)

type authServer struct{}

func (s authServer) Signup(ctx context.Context, request *proto.SignupRequest) (*proto.AuthResponse, error) {
	panic("implement me")
}

func (s authServer) UsernameUsed(ctx context.Context, request *proto.UsernameUsedRequest) (*proto.UsedResponse, error) {
	panic("implement me")
}

func (s authServer) EmailUsed(ctx context.Context, request *proto.EmailUsedRequest) (*proto.UsedResponse, error) {
	panic("implement me")
}

func (s authServer) AuthUser(ctx context.Context, request *proto.AuthUserRequest) (*proto.AuthUserResponse, error) {
	panic("implement me")
}

func (authServer) Login(_ context.Context, in *proto.LoginRequest) (*proto.AuthResponse, error) {
	login, password := in.GetLogin(), in.GetPassword()
	ctx, cancel := global.NewDBContext(5 * time.Second)
	defer cancel()

	var user global.User
	global.DB.Collection("user").
		FindOne(ctx, bson.M{"$or": []bson.M{{"username": login}, {"email": login}}}).Decode(&user)

	if user == global.NilUser {
		return &proto.AuthResponse{}, errors.New("wrong login credentials provided")
	}

	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)) != nil {
		return &proto.AuthResponse{}, errors.New("wrong login credentials provided")
	}

	return &proto.AuthResponse{Token: user.GetToken()}, nil
}

func main() {
	server := grpc.NewServer()
	proto.RegisterAuthServiceServer(server, authServer{})
	listener, err := net.Listen("tcp", ":8080")
	if err != nil {
		log.Fatal("Error creating listener: ", err.Error())
	}
	server.Serve(listener)
}
