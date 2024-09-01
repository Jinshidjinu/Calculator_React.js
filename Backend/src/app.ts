import express from "express"
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
dotenv.config()
import allrouters from "./routers/allrouters"

const app = express()
const corsOption = {
    origin:[
       "http://localhost:5173"
    ],
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    credentials: true,
}

app.use(cors(corsOption))
app.use(cookieParser())
app.use(express.json())
app.use(morgan("dev"))
app.use("/api",allrouters)




export default app

