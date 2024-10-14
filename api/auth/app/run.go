package app

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/pniewiarowski/gommerce/api/auth/route"
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

	api := app.Group("/api")
	v1 := api.Group("/v1")

	auth := v1.Group("/auth")
	users := v1.Group("/users")
	usersRoles := v1.Group("/users-roles")

	route.SetupAuth(auth)
	route.SetupUser(users)
	route.SetupUserRole(usersRoles)

	log.Fatal(app.Listen(fmt.Sprintf(":%d", port)))
}
