import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import { recipeResponsitory } from '../repositories/index.js'
import {MAX_RECORDS} from '../Global/constants.js'

const responseJson = (res,results,total_page) => {
    res.status(HttpStatusCode.OK).json({
        message:'Get sucessfully',
        recipes:results,
        pages:total_page
    })
}

async function getRecipeByColletion(req,res){
    let {id,page = 1, limit = MAX_RECORDS} = req.query
    limit = limit >= MAX_RECORDS ? MAX_RECORDS : limit
    try{
        let total_page = await recipeResponsitory.getTotalPage(id,limit,"id_collection")

        let results = await recipeResponsitory.getRecipesByColletion({
            id_collection: id,
            page: page,
            limit:limit
        })
        responseJson(res,results,total_page)
    }
    catch{
        res.status(HttpStatusCode.NOT_FOUND).json({
            message: 'Can not get', 
        })
    }
}

async function getRecipeByIngredient(req,res){
    let {id,page = 1, limit = MAX_RECORDS} = req.query
    limit = limit >= MAX_RECORDS ? MAX_RECORDS : limit
    try{
        let total_page = await recipeResponsitory.getTotalPage(id,limit,"id_ingerdient")

        let results = await recipeResponsitory.getRecipeByIngredient({
            id_ingerdient: id,
            page: page,
            limit:limit
        })
        responseJson(res,results,total_page)
    }
    catch{
        res.status(HttpStatusCode.NOT_FOUND).json({
            message: 'Can not get', 
        })
    }
}

async function getRecipeByAuthor(req,res){
    let {page = 1, limit = MAX_RECORDS} = req.query
    limit = limit >= MAX_RECORDS ? MAX_RECORDS : limit
    try{
        let {author} = req.body
        let total_page = await recipeResponsitory.getTotalPage(author,limit,"author")

        let results = await recipeResponsitory.getRecipeByAuthor({
            author: author,
            page: page,
            limit:limit
        })
        responseJson(res,results,total_page)
    }
    catch{
        res.status(HttpStatusCode.NOT_FOUND).json({
            message: 'Can not get', 
        })
    }
}



export default {
    getRecipeByColletion,
    getRecipeByIngredient,
    getRecipeByAuthor
}