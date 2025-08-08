const User =require("../models/user.model");
const bcrypt=require("bcrypt");
const jsonwebtoken=require("jsonwebtoken");

const userSignUp= async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password)
    {
        return res.status(400).json({message:"Email and password is required"})
    }
    let user = await User.findOne({email})
    if(user){
        return res.status(400).json({error:"Email is already exist"})
    }
    //npm i bcrypt
    //npm i jsonwebtoken
    const hashPwd=await bcrypt.hash(password,10)
    const newUser = await User.create({
        email,password:hashPwd
    })
    let token=jsonwebtoken.sign({email,id:newUser._id},process.env.SECRET_KEY)
    return res.status(200).json({token,user:newUser})
}

const userLogin = async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password)
    {
        return res.status(400).json({message:"Email and password is required"})
    }
    let user = await User.findOne({email})
    if(user&& await bcrypt.compare(password,user.password)){
        let token=jsonwebtoken.sign({email,id:user._id},process.env.SECRET_KEY)
        return res.status(200).json({token,user})
    }
    else{
        return res.status(400).json({error:"Invalid credientials"})
    }
}

const getUser = async(req,res)=>{
    const user = await User.findById(req.params.id)
    res.json({email:user.email})
}

module.exports={userLogin,userSignUp,getUser}