package route

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/controller"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/helper"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/mapper"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/middleware"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/repository"
)

type User struct{}

func (u *User) Setup(users fiber.Router) {
	c := controller.User{
		UserRepository: repository.User{},
		UserMapper:     mapper.User{},
		ContextHelper:  helper.Context{},
		JWTHelper:      helper.JWT{},
	}

	users.Get("/", middleware.Protected(), c.Get)
	users.Get("/:id", middleware.Protected(), c.GetByID)
	users.Post("/", middleware.Protected(), c.Post)
	users.Put("/", middleware.Protected(), c.Put)
	users.Delete("/:id", middleware.Protected(), c.Delete)
}
