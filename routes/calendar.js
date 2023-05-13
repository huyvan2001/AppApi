import express from 'express';
import {
    calendarController
} from '../controllers/index.js';

const router = express.Router()

router.post('/create',calendarController.createCalendar)
router.get('/day',calendarController.getAllDaysCalendar)
router.post('/day',calendarController.getRecipeByDay)

export default router