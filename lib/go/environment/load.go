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
)

func Load(path string) {
	err := godotenv.Load(path)

	if err != nil {
		panic("create .env file first.")
	}

	isEnvironmentLoaded = true
}
