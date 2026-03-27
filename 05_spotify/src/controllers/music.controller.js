const musicModel = require("../models/music.model") 
const jwt = require("jsonwebtoken")
const {uploadFile} = require("../services/storage.service")

async function createModel(req,res){
    const token  = req.body.token;

    if(!token){
        return res.status(401).json({
            messge: "Unauthorized"
        })
    }

    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET)

        if(decode.role !== "artist"){
            return res.status(403).json({
                message: "you don't have access to create music"
            })
        }

    const {title} = req.body;
    const file = req.file;
    
    const result = await uploadFile(file.buffer.toString('base64'))

    const music = await musicModel.create({
        title,
        uri:result.url,
        artist:decode.id
    })

    return res.status(201).json({
        message: " music created successfully",
        music: {
            id : music._id,
            title: music.title,
            URI: music.uri,
            artist: music.artist,
        }
    })
    }catch(err){
        return res.status(401).json({
            message: "unauthorized"
        })
    }
}

module.exports = {createModel}