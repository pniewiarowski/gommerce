package env

import (
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

// Load file with env variables.
func Load(file string) {
	err := godotenv.Load(file)

	if err != nil {
		panic("create .env file first")
	}
}

// GetDb return database name from env variables.
func GetDb() string {
	return os.Getenv("DATABASE")
}

// GetPort return port from env variables.
func GetPort() int64 {
	port, err := strconv.ParseInt(os.Getenv("PORT"), 10, 32)

	if err != nil {
		panic("port in .env file should be a number")
	}

	return port
}

// GetMigration return flag from env variables
// to check if models should be migrated.
func GetMigration() bool {
	migration, err := strconv.ParseBool(os.Getenv("MIGRATION"))

	if err != nil {
		panic("migration in .env file should be a boolean")
	}

	return migration
}

// GetPrivateKey return private key from env variables.
func GetPrivateKey() string {
	return os.Getenv("PRIVATE_KEY")
}
