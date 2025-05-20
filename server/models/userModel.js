import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true,
        lowercase: true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        validate:{
            validator: function(){
                return true
            },
            match: [
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 
                    'Password must contain at least one letter and one number'
                ]
        },
        
    },
    verifyOtp: {
        type:String,
        default: '' 
    },
    verifyOtpExpireAt:{
        type:Number,
        default:0
    },
    isAccountVerified:{
        type: Boolean,
        default:false
    },
    resetOtp: {
        type:String,
        default: '' 
    },
    resetOtpExpireAt:{
        type:Number,
        default:0
    }
})

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (error) {
        return next(error);
      }
    }
    next();
  });
const userModel = mongoose.models.user || mongoose.model("user",userSchema)

export default userModel; 