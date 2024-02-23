package middleware

import (
	"github.com/gofiber/fiber/v2"
	jwt "github.com/gofiber/jwt/v3"
	"github.com/pniewiarowski/gommerce/lib/go/environment"
)

func Protected() fiber.Handler {
	return jwt.New(jwt.Config{
		SigningKey: []byte(environment.GetByKey("API_SECRET")),
		ErrorHandler: func(ctx *fiber.Ctx, err error) error {
			if err.Error() == "Missing or malformed JWT" {
				return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
					"error":   "unauthorized",
					"message": "missing jwt",
				})
			}

			return ctx.Status(fiber.StatusUnauthorized).JSON(&fiber.Map{
				"error":   "unauthorized",
				"message": "invalid jwt",
			})
		},
	})
}
