import express from 'express';
import {
    planDetailController
} from '../controllers/index.js';

const router = express.Router()

router.get('/:id',planDetailController.getPlanDetailByID)

export default router