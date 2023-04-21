import { MAX_RECORDS } from "../Global/constants.js";
import { Recipe } from "../models/index.js";

const getRecipeByFilter = async({
    page,
    size,
    list_id_category_detail,
    time,
    serves,
    calories,
    author,
    searchString
}) => {

}

const getRecipeByIngredient = async({
    page,
    size,
    id_ingredient
}) =>
{
    let filterRecipesByIngredient = await Recipe.find({id_ingredient :id_ingredient})
}

const getTotalPageInCollection = async(id) => {
    let total = await Recipe.find({id_collection: id}).countDocuments()
    return Math.ceil(total/MAX_RECORDS)
}

const getRecipesByColletion = async({
    id_collection,
    page,
    size
}) => {
    let results = Recipe.aggregate([
        {
            $lookup: {
              from: 'categorydetails',
              localField: 'id_category_detail',
              foreignField: 'id_category_detail',
              as: 'category_details'
            }
        },
        {
            $match:{id_collection: id_collection}
        },
        {
            $project:{
                id_recipe:1,
                id_recipe_detail:1,
                name:1,
                image_url:1,
                total_time:1,
                author:1,
                category_details:{
                    _id:1,
                    name:1,
                    url_image:1
                }
            }
        },
        {$skip: (page - 1) * size},
        {$limit: size},


    ])
    return results
}


export default {
    getTotalPageInCollection,
    getRecipesByColletion
}