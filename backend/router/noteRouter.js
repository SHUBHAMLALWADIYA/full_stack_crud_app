const express=require("express");
const NoteModel=require("../models/notesModel");
const UserModel = require("../models/UserMOdel");

const noteRouter=express.Router();

noteRouter.post("/create",async(req,res)=>{
    try {
       
        const note=new NoteModel(req.body);
        await note.save();
       return res.status(200).send({msg:"note has been created ",note:note})
    } catch (error) {
       return res.send({msg:"some thing wrong in Notes",error:error})
    }
})

noteRouter.get("/",async(req,res)=>{
    try {
        const note=await NoteModel.find();
       return res.status(200).send({msg:"what you are finding is here",note:note})
    } catch (error) {
       return res.send({msg:"some thing wrong in Get Notes",error:error})
    }
})


noteRouter.patch("/update/:id",async(req,res)=>{
    const id=req.params.id
    try {
      const user=await UserModel.find({_id})
       await NoteModel.findByIdAndUpdate({_id:id},req.body)
       return res.status(200).send({msg:"your note is updated",update:req.body})
    } catch (error) {
       return res.send({msg:"some thing wrong in Update(patch) Notes",error:error})
    }
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    try {
       await NoteModel.findByIdAndDelete({_id:id})
      return res.status(200).send({msg:"your note is deleted"})
    } catch (error) {
       return res.send({msg:"some thing wrong in delete (delete) Notes",error:error})
    }
})

module.exports=noteRouter