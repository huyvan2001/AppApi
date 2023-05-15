import express from 'express';
import {
    likeDishController
} from '../controllers/index.js';

const router = express.Router()

router.get('/',likeDishController.getLikeDish)

export default router