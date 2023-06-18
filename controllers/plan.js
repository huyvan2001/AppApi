import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import {planResponsitory} from '../repositories/index.js'

async function getPlan(req,res){
    try{
        let results = await planResponsitory.getPlan()
        res.status(HttpStatusCode.OK).json({
            plans:results
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
    getPlan
}
