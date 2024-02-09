package environment

import (
	"github.com/joho/godotenv"
)

var isEnvironmentLoaded = false

func Load(path string) {
	err := godotenv.Load(path)

	if err != nil {
		panic("create .env file first.")
	}

	isEnvironmentLoaded = true
}
