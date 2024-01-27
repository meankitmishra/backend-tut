import dotenv from "dotenv"
import { fileURLToPath } from 'url';
import { dirname,resolve } from 'path';
import {app} from "./app.js"

// import mongoose from "mongoose";
// import {DB_NAME} from "./constants"
// import express from "express"

import connectDB from "./db/index.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const envPath = resolve("./.env")

dotenv.config({
    path: envPath
})

// console.log(process.env);


connectDB()
.then(()=>{
    app.on('error',(error)=>{
        console.log("Error: ", error)
        throw error
    })
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`app is listening on port ${process.env.PORT || 8000}`);
    })
})
.catch((error)=>{
    console.log("MongoDB not connected: ",error);
})






/*
const app = express()

;( async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on('error',(error)=>{
            console.log("Error: ", error)
            throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log(`app is listening on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("Error: ", error)
        throw error;
    }
})()
*/