import express from 'express';
import {
    filterController
} from '../controllers/index.js';

const router = express.Router()

router.get('/time',filterController.getTime)
router.get('/serve',filterController.getServe)
router.get('/kcal',filterController.getKcal)
router.get('/author',filterController.getAuthor)
router.get('/ingredient',filterController.getIngredient)

export default router