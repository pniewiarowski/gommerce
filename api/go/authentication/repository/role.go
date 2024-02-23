package repository

import (
	"errors"
	"github.com/pniewiarowski/gommerce/cmd/go/authentication/model"
	"github.com/pniewiarowski/gommerce/lib/go/database"
)

type Role struct{}

func (_ *Role) Create(role *model.Role) (*model.Role, error) {
	err := database.DataBase.Create(role).Error

	if err != nil {
		return nil, err
	}

	err = database.DataBase.First(&role).Error

	return role, err
}

func (_ *Role) GetAll() ([]model.Role, error) {
	var roles []model.Role

	err := database.DataBase.Find(&roles).Error

	return roles, err
}

func (_ *Role) GetByID(entityID uint) (*model.Role, error) {
	var role model.Role

	err := database.DataBase.First(&role, "id = ?", entityID).Error

	return &role, err
}

func (r *Role) Update(role, updatedRole *model.Role) (*model.Role, error) {
	if role.EntityID <= 0 {
		return nil, errors.New("invalid entity id")
	}

	db := database.DataBase.Model(role).Updates(&updatedRole)

	if db.RowsAffected == 0 {
		return nil, errors.New("role not found")
	}

	if db.Error != nil {
		return nil, db.Error
	}

	return r.GetByID(role.EntityID)
}

func (r *Role) Delete(role *model.Role) ([]model.Role, error) {
	return r.DeleteByID(role.EntityID)
}

func (r *Role) DeleteByID(entityID uint) ([]model.Role, error) {
	var role model.Role

	db := database.DataBase.Delete(&role, entityID)

	if db.RowsAffected == 0 {
		return nil, errors.New("role not found")
	}

	if db.Error != nil {
		return nil, db.Error
	}

	return r.GetAll()
}
