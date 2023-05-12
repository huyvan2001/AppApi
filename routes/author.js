import express from 'express';
import {
    authorController
} from '../controllers/index.js';

const router = express.Router()

router.post('/',authorController.getAuthor)
router.post('/search',authorController.searchAuthor)

export default router