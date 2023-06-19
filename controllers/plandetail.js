import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import {planDetailResponsitory} from '../repositories/index.js'

async function getPlanDetailByID(req,res){
    try {
        let id = req.params.id
        let result = await planDetailResponsitory.getPlanDetailByID(id)
        res.status(HttpStatusCode.OK).json({
            detail:result[0]
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
    getPlanDetailByID
}