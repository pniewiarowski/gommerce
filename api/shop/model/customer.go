package model

import "time"

type Customer struct {
	ID        uint   `gorm:"primaryKey" json:"id"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	IsActive  *bool  `json:"isActive"`
	CreatedAt time.Time
	UserID    uint `json:"userID"`
}
