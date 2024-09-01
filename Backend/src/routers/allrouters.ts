import express from 'express'
import { calculationController } from '../controllers/calculation'

const {
    calculation,
    history,
    deletehistory


} = calculationController()

const router = express.Router()

router.post("/calculation",calculation)
router.get("/history",history)
router.delete('/deletehistory',deletehistory)

export default router;