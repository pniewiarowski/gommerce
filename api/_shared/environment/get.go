package environment

import (
	"fmt"
	"os"
	"strconv"
)

func GetDatabaseHost() string {
	if !isEnvironmentLoaded {
		panic("first load environment file via env package api.")
	}

	return os.Getenv(databaseHostEnvironmentKey)
}

func GetDatabaseUser() string {
	if !isEnvironmentLoaded {
		panic("first load environment file via env package api.")
	}

	return os.Getenv(databaseUserEnvironmentKey)
}

func GetDatabasePassword() string {
	if !isEnvironmentLoaded {
		panic("first load environment file via env package api.")
	}

	return os.Getenv(databasePasswordEnvironmentKey)
}

func GetDatabaseName() string {
	if !isEnvironmentLoaded {
		panic("first load environment file via env package api.")
	}

	return os.Getenv(databaseNameEnvironmentKey)
}

func GetDatabasePort() int {
	if !isEnvironmentLoaded {
		panic("first load environment file via env package api.")
	}

	port, err := strconv.Atoi(os.Getenv(databasePortEnvironmentKey))

	if err != nil {
		panic(fmt.Sprintf("%s enviroment should be able to proccess into intiger.", databasePortEnvironmentKey))
	}

	return port
}
