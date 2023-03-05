package database

import (
	"fmt"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// DataBase instance to manage database.
var DataBase *gorm.DB

// Setup SQLite database.
func SetupSQLite(database string) {
	if DataBase != nil {
		panic("database already setup")
	}

	database = fmt.Sprintf("%s.db", database)
	db, err := gorm.Open(sqlite.Open(database), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	DataBase = db
}
