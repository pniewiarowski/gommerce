package database

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DataBase *gorm.DB

func Setup(host, user, password, databaseName string, port int) {
	db, err := gorm.Open(sqlite.Open("database.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	if err != nil {
		panic("failed to load plugins")
	}

	DataBase = db
}
