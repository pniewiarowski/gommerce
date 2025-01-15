package main

import (
	"github.com/pniewiarowski/gommerce/api/_shared/database"
	"github.com/pniewiarowski/gommerce/api/_shared/environment"
	"github.com/pniewiarowski/gommerce/api/shop/app"
	"github.com/pniewiarowski/gommerce/api/shop/model"
	"github.com/pniewiarowski/gommerce/api/shop/model/relation"
)

var Models = []interface{}{
	model.Category{},
	model.Product{},
	model.Customer{},
	model.Address{},
	model.Order{},
	model.Opinion{},
	relation.OrderProductRelation{},
	relation.CustomerFollowingProductRelation{},
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
