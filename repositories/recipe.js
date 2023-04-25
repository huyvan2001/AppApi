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

const getTotalRecord = async(id,field) => {
    const query = {}; // Đối tượng truy vấn
    query[field] = id;
    let total = await Recipe.find(query).countDocuments()
    return total
}

const getResultReturn = ({
    id,
    page,
    limit,
    field

}) => {
    const query = {}; // Đối tượng truy vấn
    query[field] = id;
    page = parseInt(page)
    limit = parseInt(limit)
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
            $match:query
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
        {$skip: (page - 1) * limit},
        {$limit: limit}
    ])
    return results
}

const getRecipeByAuthor = async({
    author,
    page,
    limit
}) => {
    return getResultReturn({
        id : author,
        page:page,
        limit:limit,
        field:"author"
    })
}

const getIngredientByRecipe = async(id) => {
    try{
        return Recipe.aggregate([
            {
                $lookup: {
                    from: 'ingredients',
                    localField: 'id_ingerdient',
                    foreignField: 'id_ingredient',
                    as: 'ingredients'
                }
            },
            {
                $match: { id_recipe_detail: id }
            },
            {
                $project: {
                    ingredients:{
                        name:1,
                        image_url:1
                    }
                }
            }
        ])
    }
    catch(exception){
        console.log(exception)
    }
}

const getRecipeByIngredient = async({
    id_ingerdient,
    page,
    limit
}) =>
{
    return getResultReturn({
        id : id_ingerdient,
        page:page,
        limit:limit,
        field:"id_ingerdient"
    })
}

const getRecipesByColletion = async({
    id_collection,
    page,
    limit
}) => {
    return getResultReturn({
        id : id_collection,
        page:page,
        limit:limit,
        field:"id_collection"
    })
}


export default {
    getTotalRecord,
    getRecipesByColletion,
    getRecipeByIngredient,
    getRecipeByAuthor,
    getIngredientByRecipe
}