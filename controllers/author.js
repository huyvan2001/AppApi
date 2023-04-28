import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import {authorResponsitory} from '../repositories/index.js'
import {MAX_RECORDS} from '../global/constants.js'

async function getAuthor(req,res){
    let {id,page = 1, limit = MAX_RECORDS} = req.query
    limit = limit >= MAX_RECORDS ? MAX_RECORDS : limit
    try{
        let total_page = await authorResponsitory.getTotalPage(limit)
        let results = await authorResponsitory.getAuthor({
            page: page,
            limit:limit
        })
        res.status(HttpStatusCode.OK).json({
            authors:results,
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
    getAuthor
}