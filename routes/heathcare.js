import express from 'express';
import {
    heathCareController
} from '../controllers/index.js';

const router = express.Router()

router.get('/',heathCareController.getHealthCare)

export default router