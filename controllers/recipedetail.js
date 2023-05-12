import { recipeResponsitory,
         recipeDetailResponsitory,
         recipeNutritionRespository
       } from "../repositories/index.js";
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
async function getRecipeDetailById(req,res){
    try{
        let id = req.params.id
        let ingredients = await recipeResponsitory.getIngredientByRecipe(id)
        let id_recipe_nutrition = await recipeDetailResponsitory.getIdNutrition(id)
        let nutritions = await recipeNutritionRespository.getAllNutritionById(id_recipe_nutrition)
        let detail = await recipeDetailResponsitory.getRecipeDetailById(id)
        res.status(HttpStatusCode.OK).json({
            ingredients: ingredients[0].ingredients,
            nutritions:nutritions,
            details : detail,
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
    getRecipeDetailById
}