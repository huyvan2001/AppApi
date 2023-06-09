import express from 'express';
import {
    infoController
} from '../controllers/index.js';

const router = express.Router()

router.post('/create',infoController.createInfo)
router.put('/update',infoController.updateInfo)
router.get('/',infoController.getInfo)


export default router