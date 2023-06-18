import express from 'express';
import {
    planController
} from '../controllers/index.js';

const router = express.Router()

router.get('/',planController.getPlan)

export default router