package environment

import (
	"os"
)

func GetByKey(key string) string {
	if !isEnvironmentLoaded {
		panic("first load environment file via environment package api")
	}

	return os.Getenv(key)
}
