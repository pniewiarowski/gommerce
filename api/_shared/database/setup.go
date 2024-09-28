package database

import (
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DataBase *gorm.DB

func Setup(host, user, password, databaseName string, port int) {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%d", host, user, password, databaseName, port)
	db, err := gorm.Open(postgres.New(postgres.Config{DSN: dsn}), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	if err != nil {
		panic("failed to load plugins")
	}

	DataBase = db
}
