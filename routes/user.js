import express from 'express';
import {
    userController
} from '../controllers/index.js';

const router = express.Router()

router.post('/register',userController.registerHandle)
router.post('/login',userController.login)
router.post('/forgot',userController.forgotPassword)
router.post('/changepassword',userController.changePassword)
router.get('/activate/:token',userController.activateHandle)


export default router