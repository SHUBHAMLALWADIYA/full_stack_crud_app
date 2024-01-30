const express=require("express");
const dotenv=require("dotenv");
const connection=require("./db")
const cors=require("cors")
const cookieParser=require("cookie-parser")
const auth=require("./middleware/auth.blacklist")
//all router
const userRouter=require("./router/userRouter")
const noteRouter=require("./router/noteRouter")

dotenv.config()
const PORT=process.env.PORT;


//middleware
const app=express();
app.use(cookieParser())
app.use(cors({
    origin:[
        "https://blue-green-greyhound-wear.cyclic.app"
    ],
    credentials:true
}))
app.use(express.json())
app.use("/user",userRouter)
app.use("/notes",auth,noteRouter)


app.get("/",auth,(req,res)=>{
    res.send("home page")
})


app.listen(PORT,async()=>{
    try {
        await connection
        console.log("mongo connection is also build")
        console.log(`your server is running on Port : ${PORT}`)
    } catch (error) {
        console.log({msg:"server is not running ",error:error.massage})
    }
    
})