package dto

type RegisterDTO struct {
	ID      uint   `gorm:"primaryKey" json:"id"`
	Email   string `gorm:"unique" json:"email"`
	Enable  bool   `json:"enable"`
	RoleID  uint   `json:"role_id"`
	Token   string `json:"token"`
	UserID  uint   `json:"userID"`
	IsAdmin bool   `json:"isAdmin"`
}
