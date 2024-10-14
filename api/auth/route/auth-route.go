package route

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pniewiarowski/gommerce/api/auth/controller"
	"github.com/pniewiarowski/gommerce/api/auth/repository"
	"github.com/pniewiarowski/gommerce/api/auth/validator"
)

func SetupAuth(router fiber.Router) {
	userRepository := repository.UserRepository{}
	userRoleRepository := repository.UserRoleRepository{}
	registerValidator := validator.RegisterValidator{
		UserRepository: userRepository,
	}

	c := controller.AuthController{
		UserRepository:     userRepository,
		UserRoleRepository: userRoleRepository,
		RegisterValidator:  registerValidator,
	}

	router.Post("/login", c.Login)
	router.Post("/register", c.Register)
}
