package model

type User struct {
	ID       uint   `gorm:"primaryKey" json:"id"`
	Email    string `gorm:"unique" json:"email"`
	Password string `json:"password"`
	Enable   bool   `json:"enable"`
	RoleID   uint   `json:"role_id"`
}
