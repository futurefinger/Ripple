import { Details } from "../models/loginmodel.js";

export const Register = async(req, res) => {
    const {Username, Email, Password} = req.body;
    if(!Username || !Email || !Password){ 
        return res.status(400).json({
            message: "Details not completely filled"
        })
    }
    
    if(Email == "admin@gmail.com"){
        const user = await Details.findOne({Email});
        if(user){
            return res.status(400).json({
                message: "Admin already registered"
            })
        }
    }

    const user = await Details.create({Username, Email, Password});
    res.status(200).json({
        message: "User/Admin registered successfully"
    })
}

export const Login = async(req, res) => {
    const {Email, Password} = req.body;
    const user = await Details.findOne({Email});
    if(!user){
        return res.status(400).json({
            message: "User does not exist"
        })
    }

    if(user.Password != Password){
        return res.status(400).json({
            message: "Password is wrong"
        })
    }

    res.status(200).json({
        message: "Successfully Logged in"
    })
}