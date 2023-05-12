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
                as: 'nutrition_detail'
            }
        },
        {
            $project:{
                value:1,
                nutrition_detail:{
                        $cond: {
                          if: { $gt: [{ $size: "$nutrition_detail" }, 0] },
                          then: { $arrayElemAt: ["$nutrition_detail", 0] },
                          else: null
                        }
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