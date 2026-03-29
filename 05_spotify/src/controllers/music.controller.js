const musicModel = require("../models/music.model") 
const jwt = require("jsonwebtoken")
const {uploadFile} = require("../services/storage.service")
const albumModel = require("../models/album.model")    


async function createModel(req,res){
    const {title} = req.body;
    const file = req.file;
    
    const result = await uploadFile(file.buffer.toString('base64'))

    const music = await musicModel.create({
        title,
        uri:result.url,
        artist:req.user.id
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
}

async function createAlbum(req,res){
        const {title,music} = req.body;

        const album = await albumModel.create({
            title,
            music: music,
            artist: req.user.id
        })
        return res.status(201).json({
            message: "album created successfully",
            album: {
                id: album._id,
                title: album.title,
                music: album.music,
                artist: album.artist
            }
        })
}

async function getAllMusic(req,res){
    const music = await musicModel.find().skip(2).limit(1).populate("artist","username email")
    res.status(200).json({
        message : "Music fetched Successfully",
        music: music,
    })
}   

async function getAllAlbum(req,res){
    const album = await albumModel.find().select("title artist").populate("artist","username email")
    res.status(200).json({    
        message : "Album fetched Successfully",        
        album: album,
    })
}

async function getAlbumById(req,res){
    const albumId = req.params;
 
    const album = await albumModel.findById(albumId).populate("music").populate("artist","username email")
    
    res.status(200).json({
        message: "Album fetched Successfully",
        album: album,
    })
}

module.exports = {createAlbum,createModel,getAllMusic,getAllAlbum,getAlbumById}