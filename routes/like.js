import express from 'express';
import {
    likeController
} from '../controllers/index.js';

const router = express.Router()

router.post('/:id',likeController.likeRecipe)
router.delete('/:id',likeController.unlikeRecipe)
router.get('/',likeController.getAllLikeRecipes)

export default router