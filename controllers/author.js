import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import {authorResponsitory} from '../repositories/index.js'
import {MAX_RECORDS} from '../global/constants.js'
import { auth } from 'googleapis/build/src/apis/abusiveexperiencereport/index.js'

async function getAuthor(req,res){
    let {page = 1, limit = MAX_RECORDS} = req.query
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

async function searchAuthor(req,res){
    let {searchString,page = 1, limit = MAX_RECORDS} = req.query
    limit = limit >= MAX_RECORDS ? MAX_RECORDS : limit

    try{
        let total_record = await authorResponsitory.getTotalRecordSearch(searchString)
        limit = limit >= total_record ? total_record : limit
        if (limit == 0) {
            limit = 1
        }
        let total_page = Math.ceil(total_record/limit)
        let results = await authorResponsitory.searchAuthor({
            page,
            limit,
            searchString
        })
        res.status(HttpStatusCode.OK).json({
            authors:results,
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
    getAuthor,
    searchAuthor
}