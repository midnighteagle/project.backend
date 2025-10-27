// require("dotenv").config({path: "./.env"}) //
import dotenv from "dotenv"; // ES6 Module Syntax

import connectDB from "./db/index.js"; // Importing the connectDB function

dotenv.config({  // Specifying the env file paths configration
    path: "./.env"
})

connectDB() // Calling the function to connect to the database
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port ${process/env.PORT || 8000}`)
    })
})
.catch((error)=>{
    console.error("Failed to connect to the database:", error)
})




/*  // it is apply when you don't use db/index.js file.

import mongoose from "mongoose";

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