const BlackListModel=require("../models/blacklistModel")
const jwt=require("jsonwebtoken");
const cookieParser=require("cookie-parser")
const dotenv=require("dotenv");
const NoteModel = require("../models/notesModel");
const UserModel = require("../models/UserMOdel");

dotenv.config();




const auth=async(req,res,next)=>{
 
    const cookieOption={
        httpOnly:true,
        secure:true,
        sameSite:'None'
    }
    const accesstoken=req.cookies.accesstoken;
    const refreshtoken=req.cookies.refreshtoken;
    try {
        const blackListData= await BlackListModel.exists({accesstoken})
        console.log(blackListData)
        if(blackListData){
            res.status(200).send({msg:"please login"})
        }

        jwt.verify(accesstoken,process.env.accessToken_SecreteKey,async(err,decoded)=>{
            if(decoded){
             
         
                if(req.url=="/create"){
                  req.body.userId=decoded.userId
                  req.body.username=decoded.username
                }
                // console.log(req.url==`/update/:id`)
                // if(req.method=="PATCH"||req.method=="DELETE"){
                //     // const {id}=req.params
                   
                //     // const noteId=await NoteModel.findOne({_id:id})
                //  console.log("step 1")
                 
                // //  console.log(noteId)
                // //  console.log(noteId,decoded.userId)
                //     // if(noteId.userId==decoded.userId){
                //     //     console.log("checkID")
                //     //     next()
                //     // }
                // } 
                next()
            }else{
                if(err.message==="jwt expired"){
                    jwt.verify(refreshtoken,process.env.refreshToken_SecreteKey,(err,decoded)=>{

                        if (decoded) {
                            const accesstoken = jwt.sign({userId:decoded.userId,username:decoded.username}, process.env.accessToken_SecreteKey, {expiresIn: "15m"});
                           
                            res.cookie("accesstoken", accesstoken,cookieOption);
                          
                            next();
                          } else {
                            res.send("login again because both token expried");
                          }

                    })
                }
            }
        })
    } catch (error) {
        return res.send({ error: error.message, message: "please login again" });
    }
}


module.exports=auth