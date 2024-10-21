package main

import (
	"github.com/pniewiarowski/gommerce/api/_shared/database"
	"github.com/pniewiarowski/gommerce/api/_shared/environment"
	"github.com/pniewiarowski/gommerce/api/cms/app"
	"github.com/pniewiarowski/gommerce/api/cms/model"
)

var Models = []interface{}{
	model.Setting{},
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
	app.Run(environment.GetAPIPort())
}
