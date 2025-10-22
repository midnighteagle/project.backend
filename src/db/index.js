import mongoose from "mongoose";

import { DB_Name } from "../constants.js";

const connectDB =async ()=>{
    try {
        const connectionInstances = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
        console.log(`MongooseDB connected!! DB HOST: ${connectionInstances.connection.host}`)
    } catch (error) {
        console.error("MONGODB connection Failed:", error)
        process.exit(1)
        
    }
}
export default connectDB