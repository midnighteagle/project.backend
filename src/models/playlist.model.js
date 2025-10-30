import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema (
    {
        name:{
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true

        },
        description:{
            type: String,
            required : true,
            index: true,


        },
        videos:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Video"
        },
        object:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)
export const Playlist = mongoose.model("Playlist" , playlistSchema)