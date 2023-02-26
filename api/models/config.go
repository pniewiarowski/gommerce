package models

import (
	"gommerce/api/database"

	"gorm.io/gorm"
)

type Config struct {
	gorm.Model
	Key   string `json:"key" gorm:"unique"`
	Value string `json:"value"`
}

func GetConfigByKey(key string) string {
	core := new(Config)
	database.DataBase.First(&core, "key = ?", key)

	return core.Value
}
