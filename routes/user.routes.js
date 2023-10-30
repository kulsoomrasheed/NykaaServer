const express= require('express')
const userRouter = express.Router()
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const { UserModel } = require('../model/user.model');

userRouter.get("/",(req,res)=>{
    res.json({msg:"success"})
})
userRouter.post("/register",(req,res)=>{
    const {email,pass}= req.body
   try{
    
 bcrypt.hash(pass,5,async(err,hash)=>{
        if (err){
            res.json({err})
        }else{
            const user= new UserModel({email,pass:hash})
            await user.save()
            res.status(200).send("A new user has been registered!")
        }
    }) 
   
   }catch(error){
    console.log(error)
    res.status(404).json({err:err.message})

   }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try{
   const user = await UserModel.findOne({email})
   console.log(user,'***************');
if (user){
    bcrypt.compare(pass,user.pass,(err,result)=>{
        if (result){
            let token = jwt.sign({userID:user._id},process.env.secret)
            res.json({msg:"Login Successful!!!", token})

        }else{
            res.status(400).json({msg:"Invalid Credentials"})

        }
    })
}else{
    res.status(400).json({msg:"User does not exist"})

}
    }catch(err){
    res.json({err:err.message})
    }
})

module.exports={
    userRouter
}