import { RecipeNutrition } from "../models/index.js";

const getAllNutritionById = async(id) =>
{
   try{
    let results = RecipeNutrition.aggregate([
        {
            $match: { id_recipe_nutrition: id},
            
        },
        {
            $lookup: {
                from: 'nutritions',
                localField: 'id_nutrition',
                foreignField: 'id_nutrition',
                as: 'nutrition'
            }
        },
        {
            $project:{
                value:1,
                nutrition:{
                    name:1,
                    unit:1,
                    url_image:1
                }
            }
        }
    ])

    return results
   }
   catch(exception){
    console.log(exception)
   }

}
export default {
    getAllNutritionById
}