package app

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/pniewiarowski/gommerce/api/shop/route"
	"log"
)

func Run(port int) {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowHeaders: "Origin,Content-Type,Accept,Content-Length,Accept-Language,Accept-Encoding,Connection,Access-Control-Allow-Origin, Authorization",
		AllowOrigins: "*",
		AllowMethods: "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
	}))
	app.Use(logger.New())
	app.Static("/images/products", "./images/products")

	api := app.Group("/api")
	v1 := api.Group("/v1")

	categories := v1.Group("/categories")
	products := v1.Group("/products")

	route.SetupCategoryRoute(categories)
	route.SetupProductRoute(products)

	log.Fatal(app.Listen(fmt.Sprintf(":%d", port)))
}
