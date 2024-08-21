import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:String,
});
 const register=mongoose.model("users",registerSchema);
 export default register;