package response

type RegisterErrorResponse struct {
	Message string `json:"message"`
	Code    int    `json:"code"`
}
