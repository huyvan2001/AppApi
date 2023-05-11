import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import {categoryResponsitory} from '../repositories/index.js'

async function getAllCategories(req,res){
    
    try {
        let allCategories = await categoryResponsitory.getAllCategories()
        res.status(HttpStatusCode.OK).json({
            categories : allCategories
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
    getAllCategories
}