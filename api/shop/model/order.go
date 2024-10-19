package model

type Order struct {
	ID uint `gorm:"primaryKey" json:"id"`
}
