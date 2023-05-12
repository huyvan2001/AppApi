import express from 'express';
import {
    authorController
} from '../controllers/index.js';

const router = express.Router()

router.get('/',authorController.getAuthor)
router.get('/search',authorController.searchAuthor)

export default router