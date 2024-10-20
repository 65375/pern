import express from 'express'   
import { UtilsController } from '../controllers/utilsController'

const utilsController = new UtilsController()
const router = express.Router()

router.get('/healthcheck', utilsController.healthCheck)

export default router
