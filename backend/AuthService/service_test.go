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

func Test_authServer_Signup(t *testing.T) {
	global.ConnectToTestDB()
	global.DB.Collection("user").
		InsertOne(context.Background(), global.User{
			Username: "carl",
			Email:    "carl@gmail.com",
		})

	server := authServer{}
	_, err := server.Signup(context.Background(), &proto.SignupRequest{
		Username: "carl",
		Email:    "example@gmail.com",
		Password: "examplestring",
	})

	if err.Error() != "username is already used" {
		t.Error("1: No or the wrong Error was returned")
	}

	_, err = server.Signup(context.Background(), &proto.SignupRequest{
		Username: "example",
		Email:    "carl@gmail.com",
		Password: "examplestring",
	})

	if err.Error() != "email is already used" {
		t.Error("2: No or the wrong Error was returned")
	}

	_, err = server.Signup(context.Background(), &proto.SignupRequest{
		Username: "example",
		Email:    "example@gmail.com",
		Password: "examplestring",
	})

	if err != nil {
		t.Error("3: An error was returned")
	}

	_, err = server.Signup(context.Background(), &proto.SignupRequest{
		Username: "example",
		Email:    "example@gmail.com",
		Password: "exam",
	})

	if err.Error() != "validation failed" {
		t.Error("4: No or the wrong Error was returned")
	}
}

func Test_authServer_AuthUser(t *testing.T) {
	server := authServer{}
	res, err := server.AuthUser(context.Background(), &proto.AuthUserRequest{
		Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoie1wiSURcIjpcIjVlZjA0NGRkNGEyOGNjMzA2ZDMzYTU5ZlwiLFwiVXNlcm5hbWVcIjpcIkNhcmxcIixcIkVtYWlsXCI6XCJ0ZXN0QGdtYWlsLmNvbVwiLFwiUGFzc3dvcmRcIjpcIiQyYSQxMCQ2ekw2bU1JTXY0OGJLdVF6Wm9EczVPcVNlRVR3blk1dG1mS1c4NzMyU0YudzNHUHZvSXowT1wifSJ9.EvoL45EPdGRFsWLDRDTDC4HyVV8Oe2h6QvFh3o5HBhc",
	})

	if err != nil {
		t.Error("an error was returned")
	}

	if res.GetID() != "5ef044dd4a28cc306d33a59f" ||
		res.GetUsername() != "Carl" ||
		res.GetEmail() != "test@gmail.com" {
		t.Error("wrong result returned: ", res)
	}
}
