import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import {healthcareResponsitory} from '../repositories/index.js'

async function getHealthCare(req,res){
    try{
        let results = await healthcareResponsitory.getHeathCare()
        res.status(HttpStatusCode.OK).json({
            data:results
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
    getHealthCare
}