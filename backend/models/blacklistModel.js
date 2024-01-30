const mongoose=require("mongoose");


const blackLIstSchema=mongoose.Schema({
    accesstoken:String,
    refreshtoken:String
})

const BlackListModel=mongoose.model("blackList",blackLIstSchema);

module.exports=BlackListModel