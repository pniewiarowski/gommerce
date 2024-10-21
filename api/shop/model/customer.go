package model

type Customer struct {
	ID        uint   `gorm:"primaryKey" json:"id"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	IsActive  *bool  `json:"isActive"`
	UserID    uint   `json:"userID"`
}
