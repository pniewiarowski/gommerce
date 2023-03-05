package models

import (
	"gommerce/api/database"

	"gorm.io/gorm"
)

// Config model contains base conif settings.
type Config struct {
	gorm.Model
	Key   string `json:"key" gorm:"unique"`
	Value string `json:"value"`
}

// GetConfigByKey return Config instance base on
// given key.
func GetConfigByKey(key string) (Config, error) {
	var config Config

	err := database.DataBase.First(&config, "key = ?", key).Error

	return config, err
}
