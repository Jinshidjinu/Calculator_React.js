import mongoose from "mongoose";
import { Mydbconnetion } from "../types/dbconnetion/dbconnection";

const dboptions : Mydbconnetion ={}

export const Databaseconnection = ()=>{
    const databaseURL = process.env.DATABASE_URL || "";
    mongoose.connect(databaseURL,dboptions).then(()=>{
        console.log("Database Connected");
    }).catch((err)=>{
        console.log(`database error:${err}`)
    })
}
