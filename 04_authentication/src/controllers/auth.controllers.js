const userModel = require("../models/user.model")
const jsonwebtoken = require("jsonwebtoken")

async function registerUser(req,res){
    const {username,email,password} = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        email
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
            message: "User already exists"
        })
    }

    const user = await userModel.create({username,email,password})

    const token = jsonwebtoken.sign({
        id:user._id
    },process.env.JWT_SECRET) 

    res.cookie("token",token) //sending token in cookie storage

    res.status(201).json({
        message: "user registered successfully",
        user
    })
}

module.exports = {registerUser}