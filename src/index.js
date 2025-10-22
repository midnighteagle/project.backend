// require("dotenv").config({path: "./.env"}) //
import dotenv from "dotenv";

import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env"
})

connectDB()
/*import mongoose from "mongoose";

import { DB_Name } from "./constants";

*

/import express from "express";

const app = express()
(async()=>{
    try {
        await mongoose .connect(`${process.env.MONGODB_URI}/${MONGODB_URI}/${DB_Name}` )
        app.on("error", (error)=>{
            console.log("Error connecting to the database")
            throw error
        })
        app.listen(process.env.PORT, ()=>{
            console.log(`Server started on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.error("Error starting the server:", error)
        throw error
    }
})()
    */