import express from 'express';
import {
    healthindicatorController
} from '../controllers/index.js';

const router = express.Router()

router.post('/create/:id',healthindicatorController.createHealthIndicator)
router.get('/weight/:id',healthindicatorController.getWeightIndicator)
router.get('/heartrate/:id',healthindicatorController.getHeartRateIndicator)
router.get('/bloodsugar/:id',healthindicatorController.getBloodSugarIndicator)
router.post('/date/:id',healthindicatorController.getHealthIndicatorByDay)

export default router