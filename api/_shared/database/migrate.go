package database

func Migrate(models []interface{}) {
	for _, model := range models {
		err := DataBase.AutoMigrate(&model)
		if err != nil {
			panic("could not make migration for registered models")
		}
	}
}
