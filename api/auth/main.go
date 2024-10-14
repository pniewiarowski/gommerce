package main

import (
	"github.com/pniewiarowski/gommerce/api/_shared/database"
	"github.com/pniewiarowski/gommerce/api/_shared/environment"
	"github.com/pniewiarowski/gommerce/api/auth/app"
	"github.com/pniewiarowski/gommerce/api/auth/definition"
	"github.com/pniewiarowski/gommerce/api/auth/model"
	"github.com/pniewiarowski/gommerce/api/auth/repository"
)

var Models = []interface{}{
	model.User{},
	model.UserRole{},
}

func setup() {
	urr := repository.UserRoleRepository{}

	if _, err := urr.ReadByCode(definition.UserRoleCustomer); err != nil {
		urr.Create(&model.UserRole{Code: definition.UserRoleCustomer})
	}

	if _, err := urr.ReadByCode(definition.UserRoleAdmin); err != nil {
		urr.Create(&model.UserRole{Code: definition.UserRoleAdmin})
	}
}

func main() {
	environment.Load(".env")
	database.Setup(
		environment.GetDatabaseHost(),
		environment.GetDatabaseUser(),
		environment.GetDatabasePassword(),
		environment.GetDatabaseName(),
		environment.GetDatabasePort(),
	)

	database.Migrate(Models)
	setup()

	app.Run(environment.GetAPIPort())
}
