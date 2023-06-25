import express from 'express';
import {
    physicalHealthyLevelController
} from '../controllers/index.js';

const router = express.Router()

router.get('/',physicalHealthyLevelController.getPhysicalHealthyLevel)

export default router