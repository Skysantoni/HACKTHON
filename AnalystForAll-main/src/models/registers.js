const mongoose=require("mongoose");

const registerSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,

    },
    
},{timestamps:true});

const Register=new mongoose.model("Register",registerSchema);

module.exports=Register;