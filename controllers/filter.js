import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import {filterResponsitory,authorResponsitory,infoResponsitory, ingredientResponsitory} from '../repositories/index.js'

async function getTime(req,res){
    try{
        let results = await filterResponsitory.getTime()
        res.status(HttpStatusCode.OK).json({
            time:results
        })
    }
    catch(exception){
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.toString(),
            status: false
         })
    }
}

async function getAuthor(req,res){
    try{
        let results = await authorResponsitory.getRandomAuthor()
        res.status(HttpStatusCode.OK).json({
            authors: results,
            pages:1
        })
    }
    catch(exception){
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.toString(),
            status: false
         })
    }
}

async function getIngredient(req,res){
    try{
        let results = await ingredientResponsitory.getRandomIngredient()
        res.status(HttpStatusCode.OK).json({
            ingredients: results,
            pages:1
        })
    }
    catch(exception){
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.toString(),
            status: false
         })
    }
}

async function getServe(req,res){
    try{
        let results = await filterResponsitory.getServe()
        res.status(HttpStatusCode.OK).json({
            serves:results
        })
    }
    catch(exception){
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.toString(),
            status: false
         })
    }
}

async function getKcal(req,res){
    try{
        let results = await filterResponsitory.getKcal()
        res.status(HttpStatusCode.OK).json({
            kcal:results
        })
    }
    catch(exception){
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: exception.toString(),
            status: false
         })
    }
}

export default{
    getTime,
    getServe,
    getKcal,
    getAuthor,
    getIngredient
}