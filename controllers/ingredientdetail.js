import { ingredientDetailResponsitory } from "../repositories/index.js";
import HttpStatusCode from '../exceptions/HttpStatusCode.js'

async function getIngredientDetailById(req,res){
    try{
        let id = req.params.id
        let details = await ingredientDetailResponsitory.getIngredientDetailByID(id)
        res.status(HttpStatusCode.OK).json({
            details : details[0],
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
    getIngredientDetailById
}