package repository

import (
	"errors"
	"github.com/pniewiarowski/gommerce/api/_shared/database"
	"github.com/pniewiarowski/gommerce/api/cms/model"
)

type ThemeRepository struct{}

func (_ *ThemeRepository) Create(theme *model.Theme) (*model.Theme, error) {
	err := database.DataBase.Create(theme).Error

	if err != nil {
		return nil, err
	}

	return theme, nil
}

func (_ *ThemeRepository) Read() ([]model.Theme, error) {
	var themes []model.Theme

	err := database.DataBase.Find(&themes).Error

	return themes, err
}

func (_ *ThemeRepository) ReadByID(entityID uint) (*model.Theme, error) {
	var theme model.Theme

	err := database.DataBase.First(&theme, "id = ?", entityID).Error

	return &theme, err
}

func (tr *ThemeRepository) Update(theme, updatedTheme *model.Theme) (*model.Theme, error) {
	if theme.ID <= 0 {
		return nil, errors.New("invalid entity id")
	}

	db := database.DataBase.Model(theme).Updates(updatedTheme)

	if db.RowsAffected == 0 {
		return nil, errors.New("category not found")
	}

	if db.Error != nil {
		return nil, db.Error
	}

	return tr.ReadByID(theme.ID)
}

func (tr *ThemeRepository) Delete(theme *model.Theme) ([]model.Theme, error) {
	return tr.DeleteByID(theme.ID)
}

func (tr *ThemeRepository) DeleteByID(entityID uint) ([]model.Theme, error) {
	var theme model.Theme

	db := database.DataBase.Delete(&theme, entityID)

	if db.RowsAffected == 0 {
		return nil, errors.New("setting not found")
	}

	if db.Error != nil {
		return nil, db.Error
	}

	return tr.Read()
}
