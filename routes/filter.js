import express from 'express';
import {
    filterController
} from '../controllers/index.js';

const router = express.Router()

router.get('/time',filterController.getTime)
router.get('/serve',filterController.getServe)
router.get('/kcal',filterController.getKcal)

export default router