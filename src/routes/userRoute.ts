import express from 'express'   
import { UserController } from '../controllers/userController'
import auth from '../middleware/auth';

const userController = new UserController();
const router = express.Router()

router.post('/user', userController.create)
router.get('/users', auth.hasAuthorization, userController.getAll)
router.get('/user/:id', userController.getById)
router.put('/user/:id', userController.update)
router.delete('/user/:id', auth.hasAuthorization, userController.delete)

export default router
