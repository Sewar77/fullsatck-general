import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import authRoutes from "./src/routes/auth.Routes.js"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
dotenv.config()
const app = express()
app.use(helmet())
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api', authRoutes)






const port = process.env.PORT
app.listen(port, () => {
    console.log(`server running on port ${port}`);
})