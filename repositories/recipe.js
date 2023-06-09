import { Recipe } from "../models/index.js";


const getTotalRecipeByFilter = async({
    id_category_detail,
    total_time,
    serves,
    kcal,
    id_ingerdient,
    author,
    searchString
}) => {

    let matchConditions = getMatchCondition({
        id_category_detail,
        total_time,
        serves,
        kcal,
        id_ingerdient,
        author,
        searchString
    })


    let total = await Recipe.find(matchConditions).countDocuments()
    
    return total

}

const getRecipeByFilter = async({
    id_user,
    page,
    limit,
    id_category_detail,
    total_time,
    serves,
    kcal,
    id_ingerdient,
    author,
    searchString
}) => {
    try {

        let matchConditions = getMatchCondition({
            id_category_detail,
            total_time,
            serves,
            kcal,
            id_ingerdient,
            author,
            searchString
        })
        page = parseInt(page)
        limit = parseInt(limit)
        const recipes = await Recipe.aggregate([
            {
                $lookup: {
                    from: 'categorydetails',
                    localField: 'id_category_detail',
                    foreignField: 'id_category_detail',
                    as: 'category_details'
                  }
            },
            {
                $match: matchConditions
            },
            {
                $lookup: {
                  from: "likes",
                  let: { recipeId: "$id_recipe" },
                  pipeline: [
                    {
                      $match: {
                        $expr: {
                          $and: [
                            { $eq: ["$id_recipe", "$$recipeId"] },
                            { $eq: ["$id_user", id_user] }
                          ]
                        }
                      }
                    },
                    {
                      $project: {
                        _id: 0,
                        is_like: 1
                      }
                    }
                  ],
                  as: "like"
                }
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
                        id_category_detail:1,
                        name:1,
                        url_image:1
                    },
                    like: {
                        $cond: {
                          if: { $gt: [{ $size: "$like" }, 0] },
                          then: { $arrayElemAt: ["$like.is_like", 0] },
                          else: false
                        }
                      }
                }
            },
            {
                $skip: (page - 1) * limit
            },
            {
                $limit: limit
            }
        ]); 
        return recipes;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getMatchCondition = ({
    id_category_detail,
    total_time,
    serves,
    kcal,
    id_ingerdient,
    author,
    searchString
}) => {
    const matchConditions = {};
    if (!!id_category_detail) {
        matchConditions.id_category_detail = {$in : id_category_detail};
    }
    if (!!total_time) {
        if (total_time <= 60){
            matchConditions.total_time = { $lte: total_time };
        } 
        else {
            matchConditions.total_time = { $gte: total_time };
        }
    }
    if (!!serves) {
        if (serves <= 8){
            matchConditions.serves = { $lte: serves };
        } 
        else {
            matchConditions.serves = { $gte: serves };
        }
    }
    if (!!kcal) {
        if (kcal <= 1500){
            matchConditions.kcal = { $lte: kcal };
        } 
        else {
            matchConditions.kcal = { $gte: kcal };
        }
    }
    if (!!id_ingerdient) {
        matchConditions.id_ingerdient = {$in : id_ingerdient};
    }
    if (!!author) {
        matchConditions.author = {$in : author};
    }
    if (!!searchString) {
        matchConditions.name = {$regex: new RegExp(searchString, 'i')};
    }
    return matchConditions
}

const getTotalRecord = async(id,field) => {
    const query = {}; // Đối tượng truy vấn
    query[field] = id;
    let total = await Recipe.find(query).countDocuments()
    return total
}

const getResultReturn = ({
    id_user,
    id,
    page,
    limit,
    field

}) => {
    const query = {}; // Đối tượng truy vấn
    query[field] = id;
    page = parseInt(page)
    limit = parseInt(limit)

    const results = Recipe.aggregate([
        {
            $lookup: {
              from: 'categorydetails',
              localField: 'id_category_detail',
              foreignField: 'id_category_detail',
              as: 'category_details'
            }
        },
        {
          $match: query
        },
        {
          $lookup: {
            from: "likes",
            let: { recipeId: "$id_recipe" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$id_recipe", "$$recipeId"] },
                      { $eq: ["$id_user", id_user] }
                    ]
                  }
                }
              },
              {
                $project: {
                  _id: 0,
                  is_like: 1
                }
              }
            ],
            as: "like"
          }
        },
        {
          $project: {
            id_recipe: 1,
            id_recipe_detail: 1,
            name: 1,
            image_url: 1,
            total_time: 1,
            author: 1,
            category_details: {
              _id: 1,
              id_category_detail:1,
              name: 1,
              url_image: 1
            },
            like: {
              $cond: {
                if: { $gt: [{ $size: "$like" }, 0] },
                then: { $arrayElemAt: ["$like.is_like", 0] },
                else: false
              }
            }
          }
        },
        { $skip: (page - 1) * limit },
        { $limit: limit }
      ]);
   
    return results
}

const getRecipeByAuthor = async({
    id_user,
    author,
    page,
    limit
}) => {
    return getResultReturn({
        id_user,
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
                    _id:0,
                    ingredients: 1
                }
            }
        ])
    }
    catch(exception){
        console.log(exception)
    }
}

const getTotalRecordByRandomSearch = async(searchString) => {

    let results = await Recipe.aggregate([
        {
            $sample: {size : 100}
        },
        {
            $match: {name: { $regex: searchString,$options: 'i'}}
        }, 
        {
            $group: {
                _id: null,
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                count: 1
            }
        }
    ])
    return results[0].count
}

const getRandomRecipe = async({
    id_user,
    page,
    limit,
    searchString
}) => {
    try{
    let query = {}
    console.log(searchString)
    if (searchString){
        query = {name: { $regex: searchString,$options: 'i'}}
        
    }
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
            $sample: {size : 100}
        },
        {$match : query}
        ,
        {
            $lookup: {
              from: "likes",
              let: { recipeId: "$id_recipe" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$id_recipe", "$$recipeId"] },
                        { $eq: ["$id_user", id_user] }
                      ]
                    }
                  }
                },
                {
                  $project: {
                    _id: 0,
                    is_like: 1
                  }
                }
              ],
              as: "like"
            }
          }
        ,
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
                    id_category_detail:1,
                    name:1,
                    url_image:1
                },
                like: {
                    $cond: {
                      if: { $gt: [{ $size: "$like" }, 0] },
                      then: { $arrayElemAt: ["$like.is_like", 0] },
                      else: false
                    }
                  }
            }
        },
        {$skip: (page - 1) * limit},
        {$limit: limit}
    ])
    return results
    }
    catch(exception){
        console.log(exception)
    }
}


const getRecipeByIngredient = async({
    id_user,
    id_ingerdient,
    page,
    limit
}) =>
{
    return getResultReturn({
        id_user: id_user,
        id : id_ingerdient,
        page:page,
        limit:limit,
        field:"id_ingerdient"
    })
}

const getRecipesByColletion = async({
    id_user,
    id_collection,
    page,
    limit
}) => {
    return getResultReturn({
        id_user,
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
    getIngredientByRecipe,
    getRecipeByFilter,
    getTotalRecipeByFilter,
    getRandomRecipe,
    getTotalRecordByRandomSearch
}