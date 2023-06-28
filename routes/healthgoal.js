import express from 'express';
import {
    healthGoalController
} from '../controllers/index.js';

const router = express.Router()

router.get('/',healthGoalController.getHealthGoal)
router.post('/create',healthGoalController.createHealthGoal)
router.post('/update/:id',healthGoalController.updateHealthGoal)
router.get('/detail/:id',healthGoalController.getHealthGoalDetail)

export default router