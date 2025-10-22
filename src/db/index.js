import mongoose from "mongoose"; // Importing mongoose for database connection

import {
  DB_Name,
} from "../constants.js"; // Importing the database name constant

const connectDB =async ()=>{ // Defining an asynchronous function to connect to the database
    try { // Try block to handle potential errors during connection
        const connectionInstances = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
        console.log(`MongooseDB connected!! DB HOST: ${connectionInstances.connection.host}`)
    } catch (error) {  // Catch block to log any connection errors
        console.error("MONGODB connection Failed:", error)  
        process.exit(1)
        
    }
}
export default connectDB // Exporting the connectDB function for use in other files