package main

import (
	"gommerce/api/app"
	"gommerce/api/database"
	"gommerce/api/env"
	"gommerce/api/models"
)

// Register your models there.
var Models = []interface{}{
	models.Config{},
}

// Entry point.
func main() {
	// Load file with env variables.
	env.Load(".env")

	// Get env variables.
	db := env.GetDb()
	migration := env.GetMigration()
	port := env.GetPort()

	// Setup database and migrate models.
	database.SetupSQLite(db)
	if migration {
		database.MakeMigration(Models)
	}

	// Run application.
	app.Run(int(port))
}
