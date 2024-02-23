package helper

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"github.com/pniewiarowski/gommerce/lib/go/environment"
	"strings"
)

type JWT struct{}

func (_ *JWT) ExtractClaims(tokenStr string) (jwt.MapClaims, bool) {
	hmacSecret := []byte(environment.GetByKey("API_SECRET"))

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

	claims[CLAIMS_ID] = uint(claims[CLAIMS_ID].(float64))
	claims[CLAIMS_ACCOUNT_TYPE_ID_CLAIM] = uint(claims[CLAIMS_ACCOUNT_TYPE_ID_CLAIM].(float64))

	return claims, true
}

func (j *JWT) ExtractClaimsFromContext(ctx *fiber.Ctx) (jwt.MapClaims, bool) {
	token := strings.Replace(ctx.Get("Authorization"), "Bearer ", "", 1)

	return j.ExtractClaims(token)
}
