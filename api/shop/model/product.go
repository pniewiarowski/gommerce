package model

import "time"

type Product struct {
	ID          uint    `gorm:"primaryKey" json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float32 `json:"price"`
	Enabled     *bool   `json:"enabled"`
	SortOrder   uint    `json:"sortOrder"`
	ImageURL    string  `json:"imageURL"`
	CreatedAt   time.Time
	CategoryID  uint `json:"categoryID"`
}
