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

func GetConfigByKey(key string) (Config, error) {
	var config Config

	err := database.DataBase.First(&config, "key = ?", key).Error

	return config, err
}
