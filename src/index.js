
import coonectDB from "./db/index.js";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({
    path: './.env'
})

coonectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`SERVER IS RUNNING AT PORT ${process.env.PORT || 8000}`);
    })
})
.catch((err)=>{
    console.log("DB CONNECTION FAILED !!!",err);
})




/*
( async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URL}/${DB_Name}`)
    } catch (error) {
        console.log("ERROR",error);
        
    }
})()
*/