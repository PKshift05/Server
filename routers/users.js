import express from 'express'
import { getAllUsers, login, register } from '../controllers/userController.js';
const userRouter =express.Router();

userRouter.get('/', getAllUsers)
userRouter.post('/login', login)
userRouter.post('/register', register)

export default userRouter;