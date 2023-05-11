import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import {ingredientResponsitory} from '../repositories/index.js'
import {MAX_RECORDS} from '../global/constants.js'

async function getIngredient(req,res){
    let {page = 1, limit = MAX_RECORDS} = req.query
    limit = limit >= MAX_RECORDS ? MAX_RECORDS : limit
    try{
        let total_record = await ingredientResponsitory.getTotalRecord()
        limit = limit >= total_record ? total_record : limit
        if (limit == 0) {
            limit = 1
        }
        let total_page = Math.ceil(total_record/limit)
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
        let total_record = await ingredientResponsitory.getTotalRecordByAlphabet({
            alphabet: key
        })
        limit = limit >= total_record ? total_record : limit
        if (limit == 0) {
            limit = 1
        }
        let total_page = Math.ceil(total_record/limit)
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

async function search(req,res){
    let {key} = req.query

    if (!key) {
        searchIngredient(req,res)
    }
    else{
        searchIngredientByAlphabet(req,res)
    }
}

async function searchIngredient(req,res){
    let {searchString,page = 1, limit = MAX_RECORDS} = req.query
    limit = limit >= MAX_RECORDS ? MAX_RECORDS : limit
    try{
        let total_record = await ingredientResponsitory.getTotalRecordSearch(searchString)
        limit = limit >= total_record ? total_record : limit
        if (limit == 0) {
            limit = 1
        }
        let total_page = Math.ceil(total_record/limit)
        let results = await ingredientResponsitory.searchIngredient({
            page: page,
            limit:limit,
            searchString
        })
        res.status(HttpStatusCode.OK).json({
            ingredients:results,
            pages:total_page
        })
    }  
    catch(exception){
        res.status(HttpStatusCode.NOT_FOUND).json({
            message: exception.toString(), 
        })
    }
}

async function searchIngredientByAlphabet(req,res){
    let {key,searchString,page = 1, limit = MAX_RECORDS} = req.query
    limit = limit >= MAX_RECORDS ? MAX_RECORDS : limit
    try{
        let total_record = await ingredientResponsitory.getTotalRecordSearchByAlphabet(searchString,key)
        limit = limit >= total_record ? total_record : limit
        if (limit == 0) {
            limit = 1
        }
        let total_page = Math.ceil(total_record/limit)
        let results = await ingredientResponsitory.searchIngredientByAlphabet({
            page: page,
            limit:limit,
            alphabet:key,
            searchString
        })
        res.status(HttpStatusCode.OK).json({
            ingredients:results,
            pages:total_page
        })
    }  
    catch(exception){
        res.status(HttpStatusCode.NOT_FOUND).json({
            message: exception.toString(), 
        })
    }
}


export default {
    getIngredient,
    getIngredientByAlphabet,
    search
}