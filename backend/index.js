const express = require('express');
const connectDB = require('./src/db/db');
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 3000;
const userRoute = require('./src/routes/userRoute');
const blogRoute = require('./src/routes/blogRoute')
const upload = require('./src/middlewares/multerMiddleware');
const errorMiddleware = require('./src/middlewares/errorMiddleware');
const cookieParser = require('cookie-parser')

connectDB();

// app.use(cors({
//    origin : process.env.CORS_ORIGIN,
//    credentials: true
// }))

app.use(cors({
    // origin: 'http://localhost:5173',
    origin: 'http://192.168.1.4:5173', 
    credentials: true
}));


app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended: true, limit: "5mb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send("Hello Server")
})

app.use('/api/user', userRoute )
app.use('/api/blog', blogRoute )

app.use(errorMiddleware)

app.listen(PORT, ()=> {
    console.log(`Server listening on PORT: ${PORT}`)
})
