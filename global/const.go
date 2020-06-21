package global

const (
	dbUri       = "mongodb+srv://standard:example@cluster0-u6zwd.mongodb.net/<dbname>?retryWrites=true&w=majority"
	dbName      = "blog-application"
	performance = 100
)

var (
	jwtSecret = []byte("blogSecret")
)
