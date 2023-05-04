import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import {filterResponsitory} from '../repositories/index.js'

async function getTime(req,res){
    try{
        let results = await filterResponsitory.getTime()
        res.status(HttpStatusCode.OK).json({
            time:results
        })
    }
    catch{
        res.status(HttpStatusCode.NOT_FOUND).json({
            message: 'Can not get', 
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
    catch{
        res.status(HttpStatusCode.NOT_FOUND).json({
            message: 'Can not get', 
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
    catch{
        res.status(HttpStatusCode.NOT_FOUND).json({
            message: 'Can not get', 
        })
    }
}

export default{
    getTime,
    getServe,
    getKcal
}