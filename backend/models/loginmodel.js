import mongoose from "mongoose";

const detailschema = new mongoose.Schema({
    Username: {
        type: String,
        requried: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    }
})

export const Details = mongoose.model("Details", detailschema);