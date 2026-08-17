import express from 'express'
import { config } from 'dotenv'

import moviesRoutes from './routes/movieRoute.js'
import authRoutes from './routes/authRoutes.js'
import { connectDB, disconnectDB } from "./config/db.js"

config()
connectDB()

const app = express()

// body parsing middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/movies", moviesRoutes)
app.use("/auth", authRoutes)

const PORT = 5001;

const server = app.listen(PORT, ()=> {
    console.log('Server running on PORT: ', PORT)
})

process.on("unhandledRejection", (err)=> {
    console.log("unhandledRejection", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1)
    })
})

process.on("uncaughtException", (err)=> {
    console.log("Uncaught Exception", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1)
    })
})

process.on("SIGTERM", (err)=> {
    console.log("SIGTERM received, shutting down gracefully", err);
    server.close(async () => {
        await disconnectDB();
        process.exit(1)
    })
})