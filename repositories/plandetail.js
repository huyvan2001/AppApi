import { PlanDetail } from "../models/index.js";

const getPlanDetailByID = async (id) => {
    return PlanDetail.aggregate([
      { $match: { id_plan_detail: id } },
      { $unwind: "$plan" },
      { $unwind: "$plan.meals" },
      {
        $lookup: {
          from: "recipes", // Tên collection chứa schema Recipe
          localField: "plan.meals.id_recipe",
          foreignField: "id_recipe",
          as: "plan.meals.recipe"
        }
      },
      { $unwind: "$plan.meals.recipe" },
      {
        $group: {
          _id: "$_id",
          id_plan_detail: { $first: "$id_plan_detail" },
          plan: {
            $push: {
              weekday: "$plan.weekday",
              meal: {
                meal_type: "$plan.meals.meal_type",
                recipe: {
                  _id: "$plan.meals.recipe._id",
                  name: "$plan.meals.recipe.name",
                  id_recipe: "$plan.meals.recipe.id_recipe",
                  id_recipe_detail: "$plan.meals.recipe.id_recipe_detail",
                  image_url: "$plan.meals.recipe.image_url"
                }
              }
            }
          }
        }
      }
    ]);
  };
export default {
    getPlanDetailByID
}
