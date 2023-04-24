import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import {ingredientResponsitory} from '../repositories/index.js'
import {MAX_RECORDS} from '../Global/constants.js'

async function getIngredient(req,res){
    let {page = 1, limit = MAX_RECORDS} = req.query
    limit = limit >= MAX_RECORDS ? MAX_RECORDS : limit
    try{
        let total_page = await ingredientResponsitory.getTotalPage(limit)
        let results = await ingredientResponsitory.getIngredient({
            page: page,
            limit:limit
        })
        res.status(HttpStatusCode.OK).json({
            ingredients:results,
            pages:total_page
        })
    }  
    catch(exception){
        res.status(HttpStatusCode.NOT_FOUND).json({
            message: 'Can not get', 
        })
    }
}
async function getIngredientByAlphabet(req,res){
    let {key,page = 1, limit = MAX_RECORDS} = req.query
    limit = limit >= MAX_RECORDS ? MAX_RECORDS : limit
    try{
        let total_page = await ingredientResponsitory.getTotalPageByAlphabet({
            alphabet: key,
            limit: limit
        })
        let results = await ingredientResponsitory.getIngredientByAlphabet({
            page: page,
            limit:limit,
            alphabet:key
        })
        res.status(HttpStatusCode.OK).json({
            ingredients:results,
            pages:total_page
        })
    }  
    catch(exception){
        res.status(HttpStatusCode.NOT_FOUND).json({
            message: 'Can not get', 
        })
    }
}


export default {
    getIngredient,
    getIngredientByAlphabet
}