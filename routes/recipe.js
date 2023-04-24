import express from 'express';
import {
    recipeController
} from '../controllers/index.js';

const router = express.Router()

router.get('/collection',recipeController.getRecipeByColletion)
router.get('/ingredient',recipeController.getRecipeByIngredient)
router.get('/author',recipeController.getRecipeByAuthor)

export default router