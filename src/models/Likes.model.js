import mongoose, { Schema } from "mongoose";

const likesSchema = new Schema(
    {
        comment: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        },
        videos:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Video"
        },
        likeBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Likes" 
        },
        tweet:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Tweet" 
        }
    },
    {

    }
)
export const Likes = mongoose.model("Likes" , likesSchema)