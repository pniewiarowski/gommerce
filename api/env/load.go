package env

import (
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

// Load .env file.
func Load(file string) {
	err := godotenv.Load(file)

	if err != nil {
		panic("create .env file first")
	}
}

// GetDb get database name from env.
func GetDb() string {
	return os.Getenv("DATABASE")
}

// GetPort get port from env.
func GetPort() int64 {
	port, err := strconv.ParseInt(os.Getenv("PORT"), 10, 32)

	if err != nil {
		panic("port in .env file should be a number")
	}

	return port
}

// GetMigration get flag for migration from env.
func GetMigration() bool {
	migration, err := strconv.ParseBool(os.Getenv("MIGRATION"))

	if err != nil {
		panic("migration in .env file should be a boolean")
	}

	return migration
}

// GetPrivateKey get private key from env.
func GetPrivateKey() string {
	return os.Getenv("PRIVATE_KEY")
}
