package main

import (
	"gommerce/api/app"
	"gommerce/api/database"
	"gommerce/api/env"
)

var Models = []interface{}{}

func main() {
	env.Load(".env")

	db := env.GetDb()
	migration := env.GetMigration()
	port := env.GetPort()

	database.Setup(db)
	if migration {
		database.MakeMigration(Models)
	}

	app.Run(int(port))
}
