package main

import (
	"context"
	"github.com/loxt/go-blog-app/global"
	"github.com/loxt/go-blog-app/proto"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
	"testing"
)

func Test_authServer_Login(t *testing.T) {
	global.ConnectToTestDB()
	pw, _ := bcrypt.GenerateFromPassword([]byte("example"), bcrypt.DefaultCost)
	global.DB.Collection("user").
		InsertOne(context.Background(), global.User{
			ID:       primitive.NewObjectID(),
			Email:    "test@gmail.com",
			Username: "Carl",
			Password: string(pw),
		})
	server := authServer{}
	_, err := server.Login(context.Background(),
		&proto.LoginRequest{Login: "test@gmail.com", Password: "example"})

	if err != nil {
		t.Error("1: an error was returned: ", err.Error())
	}

	_, err = server.Login(context.Background(),
		&proto.LoginRequest{Login: "something", Password: "something"})

	if err == nil {
		t.Error("2: error was nil")
	}

	_, err = server.Login(context.Background(),
		&proto.LoginRequest{Login: "Carl", Password: "example"})

	if err != nil {
		t.Error("3: an error was returned: ", err.Error())
	}
}

func Test_authServer_UsernameUsed(t *testing.T) {
	global.ConnectToTestDB()
	global.DB.Collection("user").
		InsertOne(context.Background(), global.User{Username: "Carl"})
	server := authServer{}
	res, err := server.UsernameUsed(context.Background(), &proto.UsernameUsedRequest{Username: "Carlo"})

	if err != nil {
		t.Error("1: an error was returned: ", err.Error())
	}

	if res.GetUsed() {
		t.Error("1: wrong result")
	}

	res, err = server.UsernameUsed(context.Background(), &proto.UsernameUsedRequest{Username: "Carl"})
	if err != nil {
		t.Error("2: an error was returned: ", err.Error())
	}

	if !res.GetUsed() {
		t.Error("2: wrong result")
	}
}

func Test_authServer_EmailUsed(t *testing.T) {
	global.ConnectToTestDB()
	global.DB.Collection("user").
		InsertOne(context.Background(), global.User{Email: "carl@gmail.com"})
	server := authServer{}
	res, err := server.EmailUsed(context.Background(), &proto.EmailUsedRequest{Email: "carlo@gmail.com"})

	if err != nil {
		t.Error("1: an error was returned: ", err.Error())
	}

	if res.GetUsed() {
		t.Error("1: wrong result")
	}

	res, err = server.EmailUsed(context.Background(), &proto.EmailUsedRequest{Email: "carl@gmail.com"})
	if err != nil {
		t.Error("2: an error was returned: ", err.Error())
	}

	if !res.GetUsed() {
		t.Error("2: wrong result")
	}
}
