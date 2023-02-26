package main

import (
	"gommerce/api/database"
	"gommerce/api/env"
)

var Models = []interface{}{}

func main() {
	env.Load(".env")

	db := env.GetDb()
	migration := env.GetMigration()

	database.Setup(db)
	if migration {
		database.MakeMigration(Models)
	}
}
