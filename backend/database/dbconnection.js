import mongoose from "mongoose"

export const dbconnection = ()=>{
    mongoose.connect(process.env.MONGOOSE_URL).then(()=>{
        console.log("Server connected to database successfully");
    }).catch((err)=>{
        console.log("Error to connect with database");
    })
}