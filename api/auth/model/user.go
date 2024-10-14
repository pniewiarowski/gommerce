package model

type User struct {
	ID         uint   `gorm:"primaryKey" json:"entity_id"`
	Email      string `gorm:"unique" json:"email"`
	Password   string `json:"password"`
	UserRoleID uint   `json:"role_id"`
}
