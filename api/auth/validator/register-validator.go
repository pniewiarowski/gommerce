package validator

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pniewiarowski/gommerce/api/auth/repository"
	"github.com/pniewiarowski/gommerce/api/auth/request"
	"github.com/pniewiarowski/gommerce/api/auth/response"
	"net/mail"
)

type RegisterValidator struct {
	UserRepository repository.UserRepository
}

func (rv *RegisterValidator) Validate(request request.RegisterRequest) (int, *response.RegisterErrorResponse) {
	if _, err := mail.ParseAddress(request.Email); err != nil {
		return fiber.StatusBadRequest, &response.RegisterErrorResponse{
			Message: "incorrect email address",
			Code:    fiber.StatusBadRequest,
		}
	}

	if len(request.Password) < 8 {
		return fiber.StatusBadRequest, &response.RegisterErrorResponse{
			Message: "password should be minimum 8 characters",
			Code:    fiber.StatusBadRequest,
		}
	}

	if rv.UserRepository.ExistWithGivenEmail(request.Email) {
		return fiber.StatusBadRequest, &response.RegisterErrorResponse{
			Message: "account with provided email already exists",
			Code:    fiber.StatusBadRequest,
		}
	}

	return 200, nil
}
