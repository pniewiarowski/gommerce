package helper

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"github.com/pniewiarowski/gommerce/api/_shared/environment"
	"github.com/pniewiarowski/gommerce/api/auth/definition"
	"github.com/pniewiarowski/gommerce/api/auth/repository"
	"strings"
)

type JWTHelper struct {
	UserRoleRepository repository.UserRoleRepository
}

func (_ *JWTHelper) ExtractClaims(tokenStr string) (jwt.MapClaims, bool) {
	hmacSecret := []byte(environment.GetAPISecretSeed())

	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		return hmacSecret, nil
	})

	if err != nil {
		return nil, false
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return nil, false
	}

	claims[definition.JwtClaimId] = uint(claims[definition.JwtClaimId].(float64))
	claims[definition.JwtClaimAccountType] = uint(claims[definition.JwtClaimAccountType].(float64))

	return claims, true
}

func (jh *JWTHelper) ExtractClaimsFromContext(ctx *fiber.Ctx) (jwt.MapClaims, bool) {
	token := strings.Replace(ctx.Get("Authorization"), "Bearer ", "", 1)

	return jh.ExtractClaims(token)
}

func (jh *JWTHelper) IsAdmin(claims jwt.MapClaims) bool {
	role, _ := jh.UserRoleRepository.ReadByCode(definition.UserRoleAdmin)

	return claims[definition.JwtClaimAccountType] == role.ID
}

func (jh *JWTHelper) IsCustomer(claims jwt.MapClaims) bool {
	role, _ := jh.UserRoleRepository.ReadByCode(definition.UserRoleCustomer)

	return claims[definition.JwtClaimAccountType] == role.ID
}
