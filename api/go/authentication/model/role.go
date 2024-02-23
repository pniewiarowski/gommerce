package model

type Role struct {
	EntityID uint   `json:"entity_id" gorm:"primaryKey;autoIncrement:true"`
	Name     string `json:"name" gorm:"index:unique"`
}
