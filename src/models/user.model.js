import bcrypt from "bcrypt"; // it is for the incrypt the password 
import jwt from "jsonwebtoken"; // it provide tokens 
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema (
    {
    usename : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true, 
        index : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true, 
        
    },
    fullname : {
        type : String,
        required : true,
        lowercase : true,
        trim : true,
        index : true, 
        
    },
    avtar : {
        type : String, // cloudnary url 
        required : true,
        
        
    },
    coverImage:{
        type: String, // cloudnary url

    }, 
    watchHistory : [
        {
        type : mongoose.Schema.Types.ObjectId,
        ref: "video",


        }
    ],
    password:{
        type: String,
        required: [true, 'Password is required ']

    },
    refrenceToken:{
        type: String
    }

    },
    {
        timestamps: true
    }
)


userSchema.pre("Save",async function(next) {
    if(this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10)
    next()
})

useSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACESS_TOKEN_EXPIRY 
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY 
        }
    )
}
export const User = mongoose.model("User", userSchema)