package main

import (
	"gommerce/api/app"
	"gommerce/api/database"
	"gommerce/api/env"
	"gommerce/api/models"
)

// Models registered models.
var Models = []interface{}{
	models.Config{},
}

// main entry point.
func main() {
	env.Load(".env")

	db := env.GetDb()
	migration := env.GetMigration()
	port := env.GetPort()

	database.SetupSQLite(db)
	if migration {
		database.MakeMigration(Models)
	}

	app.Run(int(port))
}
