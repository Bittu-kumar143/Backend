const mongoose = require("mongoose")

async function connectDB(){
    await mongoose.connect("mongodb+srv://YT:Fx83msY.mhwaZEx@backend.saxodqd.mongodb.net/halley") //method to Connect database with server
    
    console.log("Connected to DB")
}

module.exports = connectDB