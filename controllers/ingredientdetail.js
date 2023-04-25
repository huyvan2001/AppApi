import { ingredientDetailResponsitory } from "../repositories/index.js";
import HttpStatusCode from '../exceptions/HttpStatusCode.js'

async function getIngredientDetailById(req,res){
    try{
        let id = req.params.id
        let details = await ingredientDetailResponsitory.getIngredientDetailByID(id)
        res.status(HttpStatusCode.OK).json({
            details : details,
        })
    }
    catch{
        res.status(HttpStatusCode.NOT_FOUND).json({
            message: "Can't not get"
        })
    }
}
export default {
    getIngredientDetailById
}