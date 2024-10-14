package response

type LoginSuccessResponse struct {
	UserID uint   `json:"userID"`
	JWT    string `json:"JWT"`
}
