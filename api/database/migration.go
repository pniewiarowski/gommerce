package database

// MakeMigration migrate given models.
func MakeMigration(models []interface{}) {
	for _, model := range models {
		err := DataBase.AutoMigrate(&model)
		if err != nil {
			panic("could not make migration for registered models")
		}
	}
}
