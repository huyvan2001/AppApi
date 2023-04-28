import express from 'express';
import {
    ingredientController
} from '../controllers/index.js';

const router = express.Router()

router.get('/',ingredientController.getIngredient)
router.get('/alphabet',ingredientController.getIngredientByAlphabet)
export default router