const express = require("express")
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/auth.routes")
const posts = require("./routes/post.routes")


const app = express()
app.use(express.json()) //middleware
app.use(cookieParser()) //middleware

app.use("/api/auth",authRoutes) //prefix
app.use("/api/posts",posts) //prefix

module.exports = app