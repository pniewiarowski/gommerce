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

func (rv *RegisterValidator) Validate(request request.RegisterRequest) (int, *response.ErrorResponse) {
	if _, err := mail.ParseAddress(request.Email); err != nil {
		return fiber.StatusBadRequest, &response.ErrorResponse{
			Message: "incorrect email address",
		}
	}

	if len(request.Password) < 8 {
		return fiber.StatusBadRequest, &response.ErrorResponse{
			Message: "password should be minimum 8 characters",
		}
	}

	if rv.UserRepository.ExistWithGivenEmail(request.Email) {
		return fiber.StatusBadRequest, &response.ErrorResponse{
			Message: "account with provided email already exists",
		}
	}

	return 200, nil
}
