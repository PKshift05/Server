import User from "../models/User.js";

export const getUsers = async (req, res) => { }

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
 }
export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user && req.body.password === user.password) {
            res.status(200).json({ success: true, message: 'Successfully login', data: user });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (err) {
        console.log("Error in Login", err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export const register = async (req, res) => {
    const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const savedUser = await newUser.save()

        res.status(200).json({ success: true, message: 'Successfully created' })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to create', 'error': err })
    }
}
export const deleteUser = async(req, res)=>{
    const id = req.params.id
    try {
        
        await User.findByIdAndDelete(id)

        res.status(200).json({success:true, message:'Successfully deleted'})

    } catch (err) {
        res.status(500).json({success:false, message:'Failed to delete'})
        
    }
}


export const updateUser = async(req, res)=>{
    const id = req.params.id
    try {
        
        const updateUser = await User.findByIdAndUpdate(id,{
            $set: req.body
        }, {new:true})

        res.status(200).json({success:true, message:'Successfully updated', data: updateUser})

    } catch (err) {
        res.status(500).json({success:false, message:'Failed to update'})
        
    }
}

