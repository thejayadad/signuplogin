
import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
dotenv.config()
const app = express()

const PORT = process.env.PORT || 5001

//Express middleware read incoming body from req.body
app.use(express.json())

//Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/post", postRoutes)



app.listen(PORT, console.log(`listening on port ${PORT}`))