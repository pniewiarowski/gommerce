package model

type UserRole struct {
	ID   uint   `gorm:"primaryKey" json:"entity_id"`
	Code string `gorm:"unique" json:"code"`
}
