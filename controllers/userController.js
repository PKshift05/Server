import User from "../models/User.js";

export const getUsers = async (req, res) => { }
export const getAllUsers = async (req, res) => { }
export const login = async (req, res) => { }
export const register = async (req, res) => {
    const newUser = new User(req.body)
    
    try{
        const savedUser = await newUser.save()

        res.status(200).json({success:true, message:'Successfully created'})
    }catch(err){
        res.status(500).json({success:false, message:'Failed to create'})
    }
}


