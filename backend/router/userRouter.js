const express=require("express");
const UserModel=require("../models/UserMOdel")
const BlackListModel=require("../models/blacklistModel")
const bcrypt=require("bcrypt")
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")
const mongoose=require("mongoose")
const dotenv=require("dotenv");

dotenv.config()
const userRouter=express.Router();

const acc_secretKey=process.env.accessToken_SecreteKey
const ref_secretKey=process.env.refreshToken_SecreteKey

userRouter.post("/register",async(req,res)=>{
    console.log(req.body)
    const {email,username,pass}=req.body
    try {
     
        bcrypt.hash(pass,5,async(err,hash)=>{
            console.log(hash)
            if(err){
                return res.status(400).send({msg:"somthing wrong in hashing part",err:err})
            }else{
                const user=new UserModel({email,username,pass:hash});
                await user.save()//replace with create
                return res.status(200).send({msg:"New user has been created"})
            }
        })  
    } catch (error) {
        return res.status(400).send({msg:"somthing wrong in registeration part",error:error.message})
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    const cookieOption={
        httpOnly:true,
        secure:true,
        sameSite:'none'
    }
    try {
       
        const findUser= await UserModel.findOne({email})
        if(findUser){
        bcrypt.compare(pass,findUser.pass,(err,result)=>{
            if(result){
                const accesstoken=jwt.sign({userId:findUser._id,username:findUser.username},acc_secretKey,{expiresIn:"15m"})
                const refreshtoken=jwt.sign({userId:findUser._id,username:findUser.username},ref_secretKey,{expiresIn:"30m"})
                res.cookie("accesstoken",accesstoken,cookieOption)
                res.cookie("refreshtoken",refreshtoken,cookieOption)
                return res.status(200).send({msg:"Login successful!",accesstoken:accesstoken,refreshtoken:refreshtoken})
            }else{
                return res.status(200).send({msg:"your password is wrong please correct it"})
            }
        })   
        }else{
        return res.status(200).send({msg:"your credential is wrong or You have to register first"})
        }
       
    } catch (error) {
        return res.status(400).send({msg:"something went wrong",error:error.message})
    }
})



userRouter.post("/logout",async(req,res)=>{
    try {
          const accesstoken = req.cookies.accesstoken
          
          const blackListData1= await BlackListModel.find({accesstoken})
          if(accesstoken===blackListData1){
            return res.send({msg:"You are Logged out and blacklisted already..."})
          }else{
            const blackListData= new BlackListModel({accesstoken:accesstoken})
            await blackListData.save()
            return res.send({msg:"You are Logged out now..."})
          }
          
    } catch (error) {
        return res.status(400).send({msg:"something went wrong",error:error.message})
    }
})


module.exports=userRouter;