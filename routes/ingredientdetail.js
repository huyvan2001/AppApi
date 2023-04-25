import express from 'express';
import {
    ingredientdetailController
} from '../controllers/index.js';

const router = express.Router()

router.get('/:id',ingredientdetailController.getIngredientDetailById)

export default router