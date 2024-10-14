package helper

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"github.com/pniewiarowski/gommerce/api/_shared/environment"
	"github.com/pniewiarowski/gommerce/api/auth/definition"
	"strings"
)

type JWTHelper struct{}

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

func (_ *JWTHelper) IsAdmin(claims jwt.MapClaims) bool {
	return claims[definition.JwtClaimId] == definition.UserRoleAdmin
}

func (_ *JWTHelper) IsCustomer(claims jwt.MapClaims) bool {
	return claims[definition.JwtClaimAccountType] == definition.UserRoleCustomer
}
