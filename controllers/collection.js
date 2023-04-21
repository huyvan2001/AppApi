import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import {collectionResponsitory} from '../repositories/index.js'

async function getAllCollections(req,res){
    try{
        let allCollections = await collectionResponsitory.getAllCollection()
        res.status(HttpStatusCode.OK).json({
            message: "Successfully get Collection",
            collections : allCollections
        })
    }
    catch{

        res.status(HttpStatusCode.NOT_FOUND).json({
            message: "Can't not get",
            categories: []
        })
    }
}

export default{
    getAllCollections
}