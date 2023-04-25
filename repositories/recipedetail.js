import { RecipeDetail} from "../models/index.js";


const getIdNutrition = async(id_recipe_detail) => {
    try{
        let obj = await RecipeDetail.findOne({id_recipe_detail:id_recipe_detail})
                           .select("id_recipe_nutrition")
        return obj.id_recipe_nutrition    
    }
    catch(exception){
        console.log(exception)
    }
}

const getRecipeDetailById = async(id_recipe_detail) => {
    try{
        let details = RecipeDetail.aggregate([
            {
                $match: {id_recipe_detail: id_recipe_detail},
            },
            {$project:{
             name:1,
             image_url:1,
             prep_time:1,
             cook_time:1,
             serves:1,
             author:1,
             description:1,
             ingredients_detail:1,
             methods:1,
            }}
         ])
    return details

    }
    catch(exception){
        console.log(exception)
    }
}

export default{
    getRecipeDetailById,
    getIdNutrition
}