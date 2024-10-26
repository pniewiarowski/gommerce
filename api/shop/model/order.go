package model

type Order struct {
	ID           uint    `gorm:"primaryKey" json:"id"`
	CustomerID   uint    `json:"customerID"`
	FullPrice    float32 `json:"fullPrice"`
	ExtraComment string  `json:"extraComment"`
}
