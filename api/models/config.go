package models

import (
	"gommerce/api/database"

	"gorm.io/gorm"
)

// Config model contains base config settings.
type Config struct {
	gorm.Model
	Key   string `json:"key" gorm:"unique"`
	Value string `json:"value"`
}

// GetConfigByKey load Config instance from database
// base on given key.
func GetConfigByKey(key string) (Config, error) {
	var config Config

	err := database.DataBase.First(&config, "key = ?", key).Error

	return config, err
}

// CreateConfig insert Config model instance to
// database.
func CreateConfig(config *Config) (*Config, error) {
	database.DataBase.Create(&config)
	err := database.DataBase.Find(&config).Error

	return config, err
}
