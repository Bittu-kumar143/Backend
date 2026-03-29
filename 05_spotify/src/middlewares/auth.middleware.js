const jwt = require("jsonwebtoken")

async function authArtist(req,res,next){
    const token = req.body.token;

    if(!tokebn){
        return res.status(402).json({
            message: "Unauthorized"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if(decoded.role !== "artist"){
            return res.status(403).json({
                message: "you don't have access to create music"
            })            
        }

        req.user = decoded;

        next();

    }catch(err){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}

async function authUser(req,res,next){
    const token = req.body.token;

    if(!token){
        return res.status(402).json({
            message: "Unauthorized"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if(decoded.role !== "user"){
            return res.status(403).json({
                message: "you don't have access to create music"
            })            
        }

        req.user = decoded;

        next();

    }catch(err){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }                   
}

module.exports = { authArtist, authUser }
