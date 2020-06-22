package global

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"time"
)

// DB holds database connection
var DB mongo.Database

func connectToDB() {
	ctx, cancel := NewDBContext(10 * time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(dbUri))

	if err != nil {
		log.Fatal("Error connect to DB: ", err.Error())
	}

	DB = *client.Database(dbName)
}

// NewDBContext returns a new Context according to app performance
func NewDBContext(d time.Duration) (context.Context, context.CancelFunc) {
	return context.WithTimeout(context.Background(), d*performance/100)
}

// ConnectToTestDB overwrites DB with Test Database
func ConnectToTestDB() {
	ctx, cancel := NewDBContext(10 * time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(dbUri))

	if err != nil {
		log.Fatal("Error connect to DB: ", err.Error())
	}

	DB = *client.Database(dbName + "_test")
	ctx, cancel = NewDBContext(30 * time.Second)

	defer cancel()
	collections, _ := DB.ListCollectionNames(ctx, bson.M{})

	for _, collection := range collections {
		ctx, cancel = NewDBContext(10 * time.Second)
		DB.Collection(collection).Drop(ctx)
	}
}
