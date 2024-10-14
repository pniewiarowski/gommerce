package environment

import (
	"github.com/joho/godotenv"
)

var isEnvironmentLoaded = false

const (
	databaseHostEnvironmentKey     = "DATABASE_HOST"
	databaseUserEnvironmentKey     = "DATABASE_USER"
	databasePasswordEnvironmentKey = "DATABASE_PASSWORD"
	databaseNameEnvironmentKey     = "DATABASE_NAME"
	databasePortEnvironmentKey     = "DATABASE_PORT"
	apiPortEnvironmentKey          = "API_PORT"
)

func Load(file string) {
	err := godotenv.Load(file)

	if err != nil {
		panic("create .env file first")
	}

	isEnvironmentLoaded = true
}
