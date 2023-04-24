import express from 'express';
import {
    recipedetailController
} from '../controllers/index.js';

const router = express.Router()

router.get('/:id',recipedetailController.getRecipeDetailById)

export default router