import express from "express"
import bodyParser from "body-parser"
import registerRoute from './routes/registerRoute.js'
import loginRoute from "./routes/loginRoute.js"
import path from "path"
const __dirname = import.meta.dirname;

const PORT = 8000

const app = express()
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, "static")))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// app.use('/register', handleRequestBody)
// app.use('/login', handleRequestBody)
app.use('/register', registerRoute)
app.use('/login', loginRoute)



app.listen(PORT)

