package response

type JWTErrorResponse struct {
	Message string `json:"message"`
	Code    int    `json:"code"`
}
