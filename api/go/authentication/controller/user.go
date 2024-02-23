package controller

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/helper"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/mapper"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/model"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/repository"
)

type User struct {
	UserRepository repository.User
	UserMapper     mapper.User
	ContextHelper  helper.Context
	JWTHelper      helper.JWT
}

func (u User) Get(ctx *fiber.Ctx) error {
	ctx.Accepts("application/json")

	users, err := u.UserRepository.GetAll()

	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{"error": err.Error()})
	}

	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{"users": u.UserMapper.FromArray(users)})
}

func (u User) GetByID(ctx *fiber.Ctx) error {
	ctx.Accepts("application/json")

	id, _ := u.ContextHelper.GetID(ctx)
	user, err := u.UserRepository.GetByID(id)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"error": err.Error()})
	}

	return ctx.Status(fiber.StatusOK).JSON(&fiber.Map{"user": u.UserMapper.From(user)})
}

func (u User) Post(ctx *fiber.Ctx) error {
	ctx.Accepts("application/json")

	return Authentication{}.Post(ctx)
}

func (u User) Put(ctx *fiber.Ctx) error {
	ctx.Accepts("application/json")

	id, _ := u.ContextHelper.GetID(ctx)
	user := new(model.User)
	user.EntityID = id
	_, _ = u.JWTHelper.ExtractClaimsFromContext(ctx)

	return u.GetByID(ctx)
}

func (u User) Delete(ctx *fiber.Ctx) error {
	ctx.Accepts("application/json")

	id, _ := u.ContextHelper.GetID(ctx)
	_, err := u.UserRepository.DeleteByID(id)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(&fiber.Map{"error": err.Error()})
	}

	return u.Get(ctx)
}
