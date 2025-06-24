import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    wallet: {
        publicKey: {
            type: String
        },
        privateKey: {
            type: String
        },
        classicAddress: {
            type: String
        }, 
        seed: {
            type: String
        }
    },
    balance: {
        type: String
    }
})

export const User = mongoose.model("User", userschema);