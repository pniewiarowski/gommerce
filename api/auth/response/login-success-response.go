package response

type RegisterSuccessResponse struct {
	ID         uint   `gorm:"primaryKey" json:"id"`
	Email      string `gorm:"unique" json:"email"`
	Enable     bool   `json:"enable"`
	UserRoleID uint   `json:"role_id"`
}
