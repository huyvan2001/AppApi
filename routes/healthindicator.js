import express from 'express';
import {
    healthindicatorController
} from '../controllers/index.js';

const router = express.Router()

router.post('/create',healthindicatorController.createHealthIndicator)
router.get('/weight',healthindicatorController.getWeightIndicator)
router.get('/heartrate',healthindicatorController.getHeartRateIndicator)
router.get('/bloodsugar',healthindicatorController.getBloodSugarIndicator)
router.post('/date',healthindicatorController.getHealthIndicatorByDay)

export default router