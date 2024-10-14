package middleware

import (
	"github.com/gofiber/fiber/v2"
	jwt "github.com/gofiber/jwt/v3"
	"github.com/pniewiarowski/gommerce/api/_shared/environment"
	"github.com/pniewiarowski/gommerce/api/auth/response"
)

func Protected() fiber.Handler {
	return jwt.New(jwt.Config{
		SigningKey: []byte(environment.GetAPISecretSeed()),
		ErrorHandler: func(ctx *fiber.Ctx, err error) error {
			if err.Error() == "Missing or malformed JWT" {
				return ctx.Status(fiber.StatusBadRequest).JSON(&response.JWTErrorResponse{
					Message: "missing jwt",
					Code:    fiber.StatusUnauthorized,
				})
			}

			return ctx.Status(fiber.StatusUnauthorized).JSON(&response.JWTErrorResponse{
				Message: "invalid jwt",
				Code:    fiber.StatusUnauthorized,
			})
		},
	})
}
