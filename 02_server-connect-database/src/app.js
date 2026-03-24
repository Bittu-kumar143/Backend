const express = require('express');
const noteModel = require("./models/note.model")

const app = express();

app.use(express.json()) //middleware

/* note = {title,description}*/
app.post("/notes", async(req,res) => {

    const data = req.body /*{title,description}*/
    await noteModel.create({
        title: data.title,
        description : data.description
    })

    res.status(201).json({
        message: "Note created"
   })
})

app.get("/notes", async(req,res) => {
    const notes = await noteModel.find/*One*/({
        /*title:"test_title"*/
    }) //find alwayds return array


/* 
 find => [{},{}] or []
 findOne =. {} or null

*/

    res.status(200).json({
        message:"Notes fetched successfully",
        notes: notes
    })
})


app.delete("/notes/:id", async(req,res) => {
    const id = req.params.id

    await noteModel.findOneAndDelete({
        _id: id
    })

    res.status(200).json({
        message: "Note deleted successfully"
    })

})


app.patch("/notes/:id", async(req,res) => {
    const id = req.params.id
    const description = req.body.description

    await noteModel.findOneAndUpdate({_id: id}, {description})

    res.status(200).json({
        message: "Notes updated successfully"
    })
})


module.exports = app;