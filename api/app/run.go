package app

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func Run(port int) {
	app := fiber.New()
	app.Use(logger.New())

	_ = app.Group("/api")

	log.Fatal(app.Listen(fmt.Sprintf(":%d", port)))
}
