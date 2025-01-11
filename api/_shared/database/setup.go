package database

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DataBase *gorm.DB

func Setup(databaseURL string) {
	db, err := gorm.Open(postgres.Open(databaseURL), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	if err != nil {
		panic("failed to load plugins")
	}

	DataBase = db
}
