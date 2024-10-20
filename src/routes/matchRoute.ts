import express from 'express'   
import { MatchController } from '../controllers/matchController'

const matchController = new MatchController()
const router = express.Router()

router.post('/match', matchController.create)
router.put('/match', matchController.update)
router.get('/matches', matchController.getAll)

export default router
