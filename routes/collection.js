import express from 'express'
import {collectionController} from '../controllers/index.js'

const router = express.Router()

router.get('/',collectionController.getAllCollections)

export default router