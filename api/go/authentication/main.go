package main

import (
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/app"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/model"
	"github.com/pniewiarowski/gommerce/lib/go/database"
	"github.com/pniewiarowski/gommerce/lib/go/environment"
)

var Models = []interface{}{
	&model.Role{},
	&model.User{},
}

func main() {
	environment.Load(".env")

	database.Setup(
		environment.GetByKey("DATABASE_HOST"),
		environment.GetByKey("DATABASE_USER"),
		environment.GetByKey("DATABASE_PASSWORD"),
		environment.GetByKey("DATABASE_NAME"),
		environment.GetByKey("DATABASE_PORT"),
	)

	database.Migrate(Models)

	app.Run(environment.GetByKey("SERVICE_PORT"))
}
