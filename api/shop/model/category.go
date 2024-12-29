package model

import "time"

type Category struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Enabled     *bool  `json:"enabled"`
	CreatedAt   time.Time
	SortOrder   uint `json:"sortOrder"`
}
