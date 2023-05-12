import express from 'express';
import {
    recipeController
} from '../controllers/index.js';

const router = express.Router()

router.get('/collection',recipeController.getRecipeByColletion)
router.get('/ingredient',recipeController.getRecipeByIngredient)
router.post('/author',recipeController.getRecipeByAuthor)
router.get('/search',recipeController.getRecipeByFilter)
router.get('/random',recipeController.getRandomRecipe)

export default router