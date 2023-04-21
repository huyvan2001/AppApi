import express from 'express';
import {
    recipeController
} from '../controllers/index.js';

const router = express.Router()

router.get('/:id',recipeController.getRecipeByColletion)

export default router