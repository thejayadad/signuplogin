
import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import cookieParser from "cookie-parser"
import { connectDB } from "./lib/db.js"


dotenv.config()
const app = express()

const PORT = process.env.PORT || 5001
// Connect to MongoDB
connectDB(); // Ensure MongoDB connection before starting the server

//Express middleware read incoming body from req.body
app.use(express.json())


app.use(cookieParser())

//Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/post", postRoutes)



app.listen(PORT, console.log(`listening on port ${PORT}`))