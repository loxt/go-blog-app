package main

import (
	"context"
	"github.com/loxt/go-blog-app/proto"
	"google.golang.org/grpc"
	"log"
	"net"
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
	return &proto.AuthResponse{}, nil
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
