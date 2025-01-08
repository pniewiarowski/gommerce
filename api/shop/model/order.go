package model

import "time"

type Order struct {
	ID           uint    `gorm:"primaryKey" json:"id"`
	CustomerID   uint    `json:"customerID"`
	FullPrice    float32 `json:"fullPrice"`
	Status       string  `json:"status"`
	CreatedAt    time.Time
	ExtraComment string `json:"extraComment"`
}
