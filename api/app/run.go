package app

import (
	"fmt"
	"gommerce/api/router"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

// Run application.
func Run(port int) {
	app := fiber.New()
	app.Use(logger.New())

	api := app.Group("/api")
	config := api.Group("/config")

	router.SetupConfig(config)

	log.Fatal(app.Listen(fmt.Sprintf(":%d", port)))
}
