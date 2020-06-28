package main

import (
	"context"
	"github.com/loxt/go-blog-app/proto"
	"google.golang.org/grpc"
	"log"
)

func main() {
	conn, err := grpc.Dial("localhost:8080", grpc.WithInsecure())
	if err != nil {
		log.Fatal(err.Error())
	}
	client := proto.NewAuthServiceClient(conn)
	_, _ = client.Signup(context.Background(), &proto.SignupRequest{
		Username: "Carl",
		Email:    "carl@gmail.com",
		Password: "examplestring",
	})
}
