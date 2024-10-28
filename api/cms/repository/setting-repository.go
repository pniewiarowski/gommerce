package repository

import (
	"errors"
	"github.com/pniewiarowski/gommerce/api/_shared/database"
	"github.com/pniewiarowski/gommerce/api/cms/model"
)

type SettingRepository struct{}

func (_ *SettingRepository) Create(setting *model.Setting) (*model.Setting, error) {
	err := database.DataBase.Create(setting).Error

	if err != nil {
		return nil, err
	}

	return setting, nil
}

func (_ *SettingRepository) Read() ([]model.Setting, error) {
	var settings []model.Setting

	err := database.DataBase.Find(&settings).Error

	return settings, err
}

func (_ *SettingRepository) ReadByID(entityID uint) (*model.Setting, error) {
	var setting model.Setting

	err := database.DataBase.First(&setting, "id = ?", entityID).Error

	return &setting, err
}

func (sr *SettingRepository) Update(setting, updatedSetting *model.Setting) (*model.Setting, error) {
	if setting.ID <= 0 {
		return nil, errors.New("invalid entity id")
	}

	db := database.DataBase.Model(setting).Updates(updatedSetting)

	if db.RowsAffected == 0 {
		return nil, errors.New("category not found")
	}

	if db.Error != nil {
		return nil, db.Error
	}

	return sr.ReadByID(setting.ID)
}

func (sr *SettingRepository) Delete(setting *model.Setting) ([]model.Setting, error) {
	return sr.DeleteByID(setting.ID)
}

func (sr *SettingRepository) DeleteByID(entityID uint) ([]model.Setting, error) {
	var setting model.Setting

	db := database.DataBase.Delete(&setting, entityID)

	if db.RowsAffected == 0 {
		return nil, errors.New("setting not found")
	}

	if db.Error != nil {
		return nil, db.Error
	}

	return sr.Read()
}
