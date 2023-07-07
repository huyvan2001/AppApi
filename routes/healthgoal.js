import express from 'express';
import {
    healthGoalController
} from '../controllers/index.js';

const router = express.Router()

router.get('/',healthGoalController.getHealthGoal)
router.post('/create',healthGoalController.createHealthGoal)
router.put('/update/:id',healthGoalController.updateHealthGoal)
router.get('/detail/:id',healthGoalController.getHealthGoalDetail)
router.post('/finish/:id',healthGoalController.finishedGoal)

export default router