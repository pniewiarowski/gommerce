package model

type User struct {
	EntityID  uint   `json:"entity_id" gorm:"primaryKey;autoIncrement:true"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email" gorm:"index:unique"`
	Password  string `json:"password"`
	RoleID    uint   `json:"role_id"`
}
