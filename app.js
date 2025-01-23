const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config({path: ".env"})
const connectDb = require("./db/connectDb")
const fileUpload = require("express-fileupload")
const web = require("./routes/web")
const cors = require("cors")
const cookieParser = require("cookie-parser")




//image show
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp"
}))

connectDb();

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


const corsOptions = {
    origin: [
        'https://newalbum.netlify.app',
        'http://localhost:4000'
    ],
    credentials: true, // If you need to send cookies or authentication headers
};

app.use(cors(corsOptions));















app.use("/api", web)


app.listen(process.env.PORT, () => {
    console.log("server is listen on http://localhost:4000")
})