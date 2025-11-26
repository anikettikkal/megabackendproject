
import coonectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path: './.env'
})

coonectDB();




/*
( async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URL}/${DB_Name}`)
    } catch (error) {
        console.log("ERROR",error);
        
    }
})()
*/