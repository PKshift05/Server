import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './routers/tours.js'
import userRouter from './routers/users.js'

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080


mongoose.connect("mongodb+srv://quang05:quang123@cluster0.j5oyhc4.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log("connect to DB")
        app.listen(PORT, () => console.log("server is running"))
    })
    .catch(() => console.log(err))


app.use('/tours', router)
app.use('/users', userRouter)