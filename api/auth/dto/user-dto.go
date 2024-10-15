package dto

type UserDTO struct {
	ID     uint   `gorm:"primaryKey" json:"id"`
	Email  string `gorm:"unique" json:"email"`
	Enable bool   `json:"enable"`
	RoleID uint   `json:"role_id"`
}
