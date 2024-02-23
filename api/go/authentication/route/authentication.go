package route

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/controller"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/mapper"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/repository"
)

type Authentication struct{}

func (a *Authentication) Setup(authentication fiber.Router) {
	c := controller.Authentication{
		UserRepository: repository.User{},
		RoleRepository: repository.Role{},
		UserMapper:     mapper.User{},
	}

	authentication.Post("/", c.Post)
	authentication.Post("/token", c.Token)
}
