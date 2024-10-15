package repository

import (
	"errors"
	"github.com/pniewiarowski/gommerce/api/_shared/database"
	"github.com/pniewiarowski/gommerce/api/auth/model"
)

type UserRoleRepository struct{}

func (_ *UserRoleRepository) Create(userRole *model.UserRole) (*model.UserRole, error) {
	err := database.DataBase.Create(userRole).Error

	if err != nil {
		return nil, err
	}

	return userRole, nil
}

func (_ *UserRoleRepository) Read() ([]model.UserRole, error) {
	var usersRoles []model.UserRole

	err := database.DataBase.Find(&usersRoles).Error

	return usersRoles, err
}

func (_ *UserRoleRepository) ReadByID(entityID uint) (*model.UserRole, error) {
	var userRole model.UserRole

	err := database.DataBase.First(&userRole, "id = ?", entityID).Error

	return &userRole, err
}

func (_ *UserRoleRepository) ReadByCode(code string) (*model.UserRole, error) {
	var userRole model.UserRole

	err := database.DataBase.First(&userRole, "code = ?", code).Error

	return &userRole, err
}

func (_ *UserRoleRepository) ExistsWithGivenCode(code string) bool {
	var exists bool

	database.DataBase.Model(model.UserRole{}).Select("count(*) > 0").Where("code = ?", code).Find(&exists)

	return exists
}

func (urr *UserRoleRepository) Update(userRole, updatedUserRole *model.UserRole) (*model.UserRole, error) {
	if userRole.ID <= 0 {
		return nil, errors.New("invalid entity id")
	}

	db := database.DataBase.Model(userRole).Updates(&updatedUserRole)

	if db.RowsAffected == 0 {
		return nil, errors.New("user role not found")
	}

	if db.Error != nil {
		return nil, db.Error
	}

	return urr.ReadByID(userRole.ID)
}

func (urr *UserRoleRepository) Delete(userRole *model.UserRole) ([]model.UserRole, error) {
	return urr.DeleteByID(userRole.ID)
}

func (urr *UserRoleRepository) DeleteByID(entityID uint) ([]model.UserRole, error) {
	var userRole model.UserRole

	db := database.DataBase.Delete(&userRole, entityID)

	if db.RowsAffected == 0 {
		return nil, errors.New("user role not found")
	}

	if db.Error != nil {
		return nil, db.Error
	}

	return urr.Read()
}
