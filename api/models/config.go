package models

import (
	"gommerce/api/database"

	"gorm.io/gorm"
)

// Config base settings.
type Config struct {
	gorm.Model
	Key   string `json:"key" gorm:"unique"`
	Value string `json:"value"`
}

// GetConfig return all config pairs.
func GetConfig() ([]Config, error) {
	var configs []Config

	err := database.DataBase.Find(&configs).Error

	return configs, err
}

// GetConfigByKey load Config by given key.
func GetConfigByKey(key string) (Config, error) {
	var config Config

	err := database.DataBase.First(&config, "key = ?", key).Error

	return config, err
}

// CreateConfig insert Config instance to database.
func CreateConfig(config *Config) (*Config, error) {
	database.DataBase.Create(&config)
	err := database.DataBase.Find(&config).Error

	return config, err
}
