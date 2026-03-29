const express = require("express")
const musicController = require("../controllers/music.controller")
const multer = require("multer")
const authMiddleware = require("../middlewares/auth.middleware")

const upload = multer({
    storage: multer.memoryStorage()
})

const router = express.Router();

router.post("/upload",authMiddleware.authArtist,upload.single("music"),musicController.createModel) 

router.post("/album",authMiddleware.authArtist,upload.single("music"),musicController.createAlbum)  

router.get("/",authMiddleware.authUser,musicController.getAllMusic)

router.get("/album",authMiddleware.authUser,musicController.getAllAlbum)

router.get("/album/:albumId",authMiddleware.authUser,musicController.getAlbumById)

module.exports = router;