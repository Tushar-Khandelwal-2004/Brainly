import {model,Schema} from "mongoose";

const UserSchema=new Schema({
    username:{type:String,unique:true},
    password:String
})

export const UserModel =model("Users",UserSchema);