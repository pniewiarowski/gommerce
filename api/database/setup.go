package database

import (
	"fmt"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DataBase *gorm.DB

func Setup(database string) {
	database = fmt.Sprintf("%s.db", database)
	db, err := gorm.Open(sqlite.Open(database), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	DataBase = db
}
