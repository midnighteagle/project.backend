import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const VideoSchema = new Schema(
    {
        videoFile:{
            type: String, // cloudnary url
            required : true,
            
        },
        thumbnail:{
            type: String, // cloudnary url
            required : true,

        },
        title:{
            type: String, // cloudnary url
            required : true,

        },
        description:{
            type: String, // cloudnary url
            required : true,

        },
        duration:{
            type: Number, // cloudnary url
            required : true,

        },
        views:{
            type: Number,
            default: 0
        },
        isPublic:{
            type: Number,
            default: true
        },
        owner:{
            type : mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    { 
        timestamps: true 

    }
);

VideoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", VideoSchema);