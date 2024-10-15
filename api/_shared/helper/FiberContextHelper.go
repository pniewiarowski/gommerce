package helper

import (
	"errors"
	"github.com/gofiber/fiber/v2"
	"strconv"
)

type FiberContextHelper struct{}

func (_ *FiberContextHelper) GetID(ctx *fiber.Ctx) (uint, error) {
	param := ctx.Params("id")
	id, err := strconv.ParseUint(param, 10, 64)

	if err != nil || (id < 1) {
		return 0, errors.New("invalid entity id")
	}

	return uint(id), nil
}
