import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import {collectionResponsitory} from '../repositories/index.js'

async function getAllCollections(req,res){
    try{
        let allCollections = await collectionResponsitory.getAllCollection()
        res.status(HttpStatusCode.OK).json({
            collections : allCollections
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
    getAllCollections
}