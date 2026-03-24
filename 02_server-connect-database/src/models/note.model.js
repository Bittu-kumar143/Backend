const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({ //schema of database
    title: String,
    description: String
})


const noteModel = mongoose.model("note", noteSchema) //to perform CRUD operation

module.exports = noteModel 