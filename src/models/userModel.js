import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "Please provide a username..."],
        trim:true
    },
    email:{
        type:String,
        required:[true, "Please provide an email..."],
        unique:true
    },
    password:{
        type:String,
        required:[true, "Please provide a password..."]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:"student"
    },
    forgotPasswordToken:{
        type:String
    },
    forgotPasswordTokenExpiry:{
        type:Date
    },
    verifyToken:{
        type:String
    },
    verifyTokenExpiry:{
        type:Date
    }
});

const User = mongoose.models.users || mongoose.model("User",userSchema);

export default User;