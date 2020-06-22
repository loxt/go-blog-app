package main

import (
	"context"
	"errors"
	"github.com/loxt/go-blog-app/global"
	"github.com/loxt/go-blog-app/proto"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
	"google.golang.org/grpc"
	"log"
	"net"
	"regexp"
	"time"
)

type authServer struct{}

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

var server authServer

func (authServer) Signup(_ context.Context, in *proto.SignupRequest) (*proto.AuthResponse, error) {
	username, email, password := in.GetUsername(), in.GetEmail(), in.GetPassword()

	match, _ := regexp.MatchString("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$", email)

	if len(username) < 4 || len(username) > 20 ||
		len(email) < 7 || len(email) > 65 ||
		len(password) < 8 || len(password) > 128 ||
		!match {
		return &proto.AuthResponse{}, errors.New("validation failed")
	}

	res, err := server.UsernameUsed(context.Background(),
		&proto.UsernameUsedRequest{Username: username})

	if err != nil {
		log.Println("Error returned from UsernameUsed: ", err.Error())
		return &proto.AuthResponse{}, errors.New("something went wrong")
	}

	if res.GetUsed() {
		return &proto.AuthResponse{}, errors.New("username is already used")
	}

	res, err = server.EmailUsed(context.Background(),
		&proto.EmailUsedRequest{Email: email})

	if err != nil {
		log.Println("Error returned from EmailUsed: ", err.Error())
		return &proto.AuthResponse{}, errors.New("something went wrong")
	}

	if res.GetUsed() {
		return &proto.AuthResponse{}, errors.New("email is already used")
	}

	pw, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	newUser := global.User{
		ID:       primitive.NewObjectID(),
		Username: username,
		Email:    email,
		Password: string(pw),
	}

	ctx, cancel := global.NewDBContext(5 * time.Second)
	defer cancel()

	_, err = global.DB.Collection("user").InsertOne(ctx, newUser)

	if err != nil {
		log.Println("Error inserting newUser: ", err.Error())
		return &proto.AuthResponse{}, errors.New("something went wrong")
	}

	return &proto.AuthResponse{Token: newUser.GetToken()}, nil
}

func (authServer) UsernameUsed(_ context.Context, in *proto.UsernameUsedRequest) (*proto.UsedResponse, error) {
	username := in.GetUsername()
	ctx, cancel := global.NewDBContext(5 * time.Second)
	defer cancel()

	var result global.User
	global.DB.Collection("user").FindOne(ctx, bson.M{"username": username}).Decode(&result)
	return &proto.UsedResponse{Used: result != global.NilUser}, nil
}

func (authServer) EmailUsed(_ context.Context, in *proto.EmailUsedRequest) (*proto.UsedResponse, error) {
	email := in.GetEmail()
	ctx, cancel := global.NewDBContext(5 * time.Second)
	defer cancel()

	var result global.User
	global.DB.Collection("user").FindOne(ctx, bson.M{"email": email}).Decode(&result)
	return &proto.UsedResponse{Used: result != global.NilUser}, nil
}

func (authServer) AuthUser(_ context.Context, in *proto.AuthUserRequest) (*proto.AuthUserResponse, error) {
	token := in.GetToken()
	user := global.UserFromToken(token)
	return &proto.AuthUserResponse{
		ID:       user.ID.Hex(),
		Username: user.Username,
		Email:    user.Email,
	}, nil
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
