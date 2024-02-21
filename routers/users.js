import express from 'express'
import { deleteUser, getAllUsers, login, register, updateUser } from '../controllers/userController.js';
const userRouter =express.Router();

userRouter.get('/', getAllUsers)
userRouter.post('/login', login)
userRouter.post('/register', register)
userRouter.put('/update/:id', updateUser)
userRouter.delete('/delete/:id', deleteUser)


export default userRouter;