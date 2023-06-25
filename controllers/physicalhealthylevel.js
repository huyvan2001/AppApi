import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import {physicalHealthyLevelResponsitory} from '../repositories/index.js'

async function getPhysicalHealthyLevel(req,res){
    try{
        let results = await physicalHealthyLevelResponsitory.getPhysicalHealthyLevel()
        res.status(HttpStatusCode.OK).json({
            data: results
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
    getPhysicalHealthyLevel
}