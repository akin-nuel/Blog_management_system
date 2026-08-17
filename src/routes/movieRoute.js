import express from 'express'
import { title } from "../controllers/movieController.js"

const router = express.Router()

router.get('/title', title)

export default router;