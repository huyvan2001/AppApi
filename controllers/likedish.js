import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import {likedishResponsitory} from '../repositories/index.js'

async function getLikeDish(req,res){
    try{
        let results = await likedishResponsitory.getLikeDish()
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
    getLikeDish
}