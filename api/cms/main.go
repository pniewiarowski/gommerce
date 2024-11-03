package main

import (
	"github.com/pniewiarowski/gommerce/api/_shared/database"
	"github.com/pniewiarowski/gommerce/api/_shared/environment"
	"github.com/pniewiarowski/gommerce/api/cms/app"
	"github.com/pniewiarowski/gommerce/api/cms/model"
	"github.com/pniewiarowski/gommerce/api/cms/repository"
)

var Models = []interface{}{
	model.Setting{},
	model.Theme{},
}

func setup() {
	sr := repository.SettingRepository{}

	if _, err := sr.ReadByKey("current-theme"); err != nil {
		sr.Create(&model.Setting{
			Key:         "current-theme",
			Value:       "0",
			Type:        "int",
			Scope:       "shop",
			Description: "current selected theme",
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
