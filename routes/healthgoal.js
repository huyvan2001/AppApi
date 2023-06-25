import express from 'express';
import {
    healthGoalController
} from '../controllers/index.js';

const router = express.Router()

router.get('/',healthGoalController.getAllHealthGoal)
router.post('/create',healthGoalController.createHealthGoal)

router.get('/detail/:id',healthGoalController.getHealthGoalDetail)

export default router