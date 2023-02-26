package env

import (
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

func Load(file string) {
	err := godotenv.Load(file)

	if err != nil {
		panic("create .env file first")
	}
}

func GetDb() string {
	return os.Getenv("DATABASE")
}

func GetPort() int64 {
	port, err := strconv.ParseInt(os.Getenv("PORT"), 10, 32)

	if err != nil {
		panic("port in .env file should be a number")
	}

	return port
}

func GetMigration() bool {
	migration, err := strconv.ParseBool(os.Getenv("MIGRATION"))

	if err != nil {
		panic("migration in .env file shoulde be a boolean")
	}

	return migration
}

func GetPrivateKey() string {
	return os.Getenv("PRIVATE_KEY")
}
