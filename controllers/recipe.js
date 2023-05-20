import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import { recipeResponsitory } from '../repositories/index.js'
import {MAX_RECORDS} from '../global/constants.js'
import jwt from 'jsonwebtoken'

const responseJson = (res,results,total_page) => {
    res.status(HttpStatusCode.OK).json({
        recipes:results,
        pages:total_page
    })
}

async function getRecipeByFilter(req,res){
    const token = req.headers?.authorization?.split(" ")[1]
    const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
    let {_id} =  jwtObject

    let {page = 1, limit = MAX_RECORDS} = req.query
    limit = limit >= MAX_RECORDS ? MAX_RECORDS : limit
    let {
        id_category_detail,
        total_time,
        serves,
        kcal,
        id_ingredient,
        author,
        searchString
    } = req.body

    try {
        let total_record = await recipeResponsitory.getTotalRecipeByFilter({
            id_user:_id,
            id_category_detail,
            total_time,
            serves,
            kcal,
            id_ingerdient:id_ingredient,
            author,
            searchString
        })
    
        limit = limit >= total_record ? total_record : limit
        let total_page = Math.ceil(total_record/limit)
        if (limit == 0) {
            let results = []
            total_page = 0
            responseJson(res,results,total_page)
        }
        else {
            let results = await recipeResponsitory.getRecipeByFilter({
                page,
                limit,
                id_category_detail,
                total_time,
                serves,
                kcal,
                id_ingerdient:id_ingredient,
                author,
                searchString
            })
            responseJson(res,results,total_page)
        }
        
    }
    catch(exception){
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.toString(),
            status: false
         })
    }
        
}

async function getRecipeByColletion(req,res){
    const token = req.headers?.authorization?.split(" ")[1]
    const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
    let {_id} =  jwtObject
    let {id,page = 1, limit = MAX_RECORDS} = req.query
    limit = limit >= MAX_RECORDS ? MAX_RECORDS : limit
    try{
        let total_record = await recipeResponsitory.getTotalRecord(id,"id_collection")

        limit = limit >= total_record ? total_record : limit
        if (limit == 0) {
            limit = 1
        }
        let total_page = Math.ceil(total_record/limit)
        let results = await recipeResponsitory.getRecipesByColletion({
            id_user:_id,
            id_collection: id,
            page: page,
            limit:limit
        })
        responseJson(res,results,total_page)
    }
    catch(exception){
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.toString(),
            status: false
         })
    }
}

async function getRandomRecipe(req,res){
    const token = req.headers?.authorization?.split(" ")[1]
    const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
    let {_id} =  jwtObject
    let {searchString,page = 1, limit = MAX_RECORDS} = req.query
    var total_page = 10
    try{

        if (searchString){
            let total_record = await recipeResponsitory.getTotalRecordByRandomSearch(searchString)
            limit = limit >= total_record ? total_record : limit
            if (limit == 0) {
                limit = 1
            }
            total_page = Math.ceil(total_record/limit)
            
        }
        let results = await recipeResponsitory.getRandomRecipe({
            id_user:_id,
            page: page,
            limit:limit,
            searchString
        })
        responseJson(res,results,total_page)
    }
    catch(exception){
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.toString(),
            status: false
         })
    }

}


async function getRecipeByIngredient(req,res){
    const token = req.headers?.authorization?.split(" ")[1]
    const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
    let {_id} =  jwtObject
    let {id,page = 1, limit = MAX_RECORDS} = req.query
    limit = limit >= MAX_RECORDS ? MAX_RECORDS : limit
    try{
        let total_record = await recipeResponsitory.getTotalRecord(id,"id_ingerdient")
        limit = limit >= total_record ? total_record : limit
        if (limit == 0) {
            limit = 1
        }
        let total_page = Math.ceil(total_record/limit)
        let results = await recipeResponsitory.getRecipeByIngredient({
            id_user:_id,
            id_ingerdient: id,
            page: page,
            limit:limit
        })
        responseJson(res,results,total_page)
    }
    catch(exception){
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.toString(),
            status: false
         })
    }
}

async function getRecipeByAuthor(req,res){
    const token = req.headers?.authorization?.split(" ")[1]
    const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
    let {_id} =  jwtObject
    let {page = 1, limit = MAX_RECORDS} = req.query
    limit = limit >= MAX_RECORDS ? MAX_RECORDS : limit
    try{
        let {author} = req.body
        let total_record = await recipeResponsitory.getTotalRecord(author,"author")
        limit = limit >= total_record ? total_record : limit
        if (limit == 0) {
            limit = 1
        }
        let total_page = Math.ceil(total_record/limit)

        let results = await recipeResponsitory.getRecipeByAuthor({
            id_user:_id,
            author: author,
            page: page,
            limit:limit
        })
        responseJson(res,results,total_page)
    }
    catch(exception){
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.toString(),
            status: false
         })
    }
}



export default {
    getRecipeByColletion,
    getRecipeByIngredient,
    getRecipeByAuthor,
    getRecipeByFilter,
    getRandomRecipe
}