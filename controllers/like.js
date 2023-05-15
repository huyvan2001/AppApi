import { likeResponsitory } from "../repositories/index.js";
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import jwt from 'jsonwebtoken'

async function likeRecipe(req,res){
    try{

        const token = req.headers?.authorization?.split(" ")[1]
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        let {_id} =  jwtObject 
        let id_recipe = req.params.id
        await likeResponsitory.likeRecipe({
            id_user: _id,
            id_recipe
        })

        res.status(HttpStatusCode.OK).json({
            message: "Recipe add to favorite",
            status: true
        })

    }
    catch(exception) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.toString(),
            status: false
        })
    }
}

async function unlikeRecipe(req,res){
    try{
        const token = req.headers?.authorization?.split(" ")[1]
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        let {_id} =  jwtObject 
        let id_recipe = req.params.id
        await likeResponsitory.unlikeRecipe({
            id_user: _id,
            id_recipe
        })

        res.status(HttpStatusCode.OK).json({
            message: "Recipe delete to favorite",
            status: true
        })

    }
    catch(exception) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.toString(),
            status: false
        })
    }
}

async function getAllLikeRecipes(req,res){
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        let {_id} =  jwtObject

        let results = await likeResponsitory.getAllLikeRecipes(_id)

        res.status(HttpStatusCode.OK).json({
            recipes: results,
            pages: 1
        })

    }
    catch(exception){
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.toString(),
            status: false
        })

    }
}

export default {
    likeRecipe,
    unlikeRecipe,
    getAllLikeRecipes
}