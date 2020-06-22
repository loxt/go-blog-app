package main

import (
	"context"
	"github.com/loxt/go-blog-app/global"
	"go.mongodb.org/mongo-driver/bson"
)

func main() {
	_, _ = global.DB.Collection("user").InsertOne(context.Background(), bson.M{"name": "test"})
}
