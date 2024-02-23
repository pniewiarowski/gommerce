package app

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/route"
	"log"
)

func Run(port string) {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowHeaders:     "Origin,Content-Type,Accept,Content-Length,Accept-Language,Accept-Encoding,Connection,Access-Control-Allow-Origin, Authorization",
		AllowOrigins:     "*",
		AllowCredentials: true,
		AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
	}))

	app.Use(logger.New())

	api := app.Group("/rest")
	v1 := api.Group("/v1")

	userGroup := v1.Group("/users")
	userRoute := route.User{}
	roleGroup := v1.Group("/roles")
	roleRoute := route.Role{}
	authenticationGroup := v1.Group("/authentication")
	authenticationRoute := route.Authentication{}

	userRoute.Setup(userGroup)
	roleRoute.Setup(roleGroup)
	authenticationRoute.Setup(authenticationGroup)

	log.Fatal(app.Listen(fmt.Sprintf(":%s", port)))
}
