const express = require('express')

const app = express(); //creating server instance 

app.get("/",(req,res) => {
    res.send("Hello world")
})

app.get("/about", (req,res) => {
    res.send("About Page")
})

app.listen(3000) //server ko start karne ke liye 
