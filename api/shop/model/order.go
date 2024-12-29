package model

import "time"

type Order struct {
	ID           uint    `gorm:"primaryKey" json:"id"`
	CustomerID   uint    `json:"customerID"`
	FullPrice    float32 `json:"fullPrice"`
	CreatedAt    time.Time
	ExtraComment string `json:"extraComment"`
}
