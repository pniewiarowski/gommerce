package main

import (
	"github.com/pniewiarowski/gommerce/api/_shared/database"
	"github.com/pniewiarowski/gommerce/api/_shared/environment"
	"github.com/pniewiarowski/gommerce/api/auth/app"
	"github.com/pniewiarowski/gommerce/api/auth/definition"
	"github.com/pniewiarowski/gommerce/api/auth/model"
	"github.com/pniewiarowski/gommerce/api/auth/repository"
	"golang.org/x/crypto/bcrypt"
)

var Models = []interface{}{
	model.User{},
	model.UserRole{},
}

func setup() {
	urr := repository.UserRoleRepository{}
	ur := repository.UserRepository{}

	if _, err := urr.ReadByCode(definition.UserRoleCustomer); err != nil {
		urr.Create(&model.UserRole{Code: definition.UserRoleCustomer})
	}

	if _, err := urr.ReadByCode(definition.UserRoleAdmin); err != nil {
		urr.Create(&model.UserRole{Code: definition.UserRoleAdmin})
	}

	admin, _ := urr.ReadByCode(definition.UserRoleAdmin)
	if _, err := ur.ReadByEmail(environment.GetDefaultAdminEmail()); err != nil {
		password := environment.GetDefaultAdminPassword()
		hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

		ur.Create(&model.User{
			Email:    environment.GetDefaultAdminEmail(),
			Password: string(hashedPassword),
			Enable:   true,
			RoleID:   admin.ID,
		})
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
