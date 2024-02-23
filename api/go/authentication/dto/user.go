package dto

type User struct {
	EntityID  uint   `json:"entity_id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	RoleID    uint   `json:"role_id"`
}
