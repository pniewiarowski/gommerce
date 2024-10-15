package dto

type JWTDTO struct {
	Token   string `json:"token"`
	UserID  uint   `json:"userID"`
	IsAdmin bool   `json:"isAdmin"`
}
