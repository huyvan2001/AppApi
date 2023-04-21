import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import { recipeResponsitory } from '../repositories/index.js'
import {MAX_RECORDS} from '../Global/constants.js'

async function getRecipeByColletion(req,res){
    let id = req.params.id
    let {page = 1, size = MAX_RECORDS} = req.query
    try{
        let total_page = await recipeResponsitory.getTotalPageInCollection(id)
        let results = await recipeResponsitory.getRecipeByColletion({
            id_collection: id,
            page: page,
            size:size
        })
        res.status(HttpStatusCode.OK).json({
            message:'Get sucessfully',
            recipes:results,
            pages:total_page
        }
        )
    }
    catch{
        res.status(HttpStatusCode.NOT_FOUND).json({
            message: 'Can not get', 
        })
    }
}


export default {
    getRecipeByColletion
}