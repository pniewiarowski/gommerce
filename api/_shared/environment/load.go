package environment

import (
	"github.com/joho/godotenv"
)

var isEnvironmentLoaded = false

const (
	databaseURL                            = "DATABASE_URL"
	databaseHostEnvironmentKey             = "DATABASE_HOST"
	databaseUserEnvironmentKey             = "DATABASE_USER"
	databasePasswordEnvironmentKey         = "DATABASE_PASSWORD"
	databaseNameEnvironmentKey             = "DATABASE_NAME"
	databasePortEnvironmentKey             = "DATABASE_PORT"
	apiPortEnvironmentKey                  = "API_PORT"
	apiSecretSeedEnvironmentKey            = "API_SECRET_SEED"
	defaultAdminUserEmailEnvironmentKey    = "DEFAULT_ADMIN_USER_EMAIL"
	defaultAdminUserPasswordEnvironmentKey = "DEFAULT_ADMIN_PASSWORD"
)

func Load(file string) {
	err := godotenv.Load(file)

	if err != nil {
		panic("create .env file first")
	}

	isEnvironmentLoaded = true
}
