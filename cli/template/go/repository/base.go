package repository

type {{model}}Repository struct{}

func (_ *{{model}}Repository) Create({{model_lower_case}} *model.{{model}}) (*model.{{model}}, error) {
	err := database.DataBase.Create({{model_lower_case}}).Error

	if err != nil {
		return nil, err
	}

	return {{model_lower_case}}, nil
}

func (_ *{{model}}Repository) Read() ([]model.{{model}}, error) {
	var {{model_lower_case}}s []model.{{model}}

	err := database.DataBase.Find(&{{model_lower_case}}s).Error

	return {{model_lower_case}}s, err
}
