import {Like} from "../models/index.js"
import Exception from '../exceptions/Exception.js'

const likeRecipe = async ({
    id_user,
    id_recipe
}) => {

    if (!id_recipe) {
        throw new Exception(Exception.FIELD_NOT_FILLED)
    }

    let usedToLike = Like.findOne({id_user:id_user,id_recipe:id_recipe}).exec()

    if (usedToLike){
      await Like.findOneAndUpdate({id_user:id_user,id_recipe:id_recipe},{is_like:true})
    }
    else {
      await Like.create({
        id_user,
        id_recipe,
        is_like:true
       })
    }

  
}

const unlikeRecipe = async ({
    id_user,
    id_recipe
}) => {
    
   
   await Like.findOneAndUpdate({id_user:id_user,id_recipe:id_recipe},{is_like:false})
}

const getAllLikeRecipes = async(id_user) => {

    let result = await Like.aggregate([
        {
          $match: {
            id_user: id_user,
            is_like: true
          }
        },
        {
          $lookup: {
            from: 'recipes',
            let: { id_recipe: '$id_recipe' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$id_recipe', '$$id_recipe']
                  }
                }
              },
              {
                $lookup: {
                  from: 'categorydetails',
                  localField: 'id_category_detail',
                  foreignField: 'id_category_detail',
                  as: 'category_details'
                }
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
                  _id: 0,
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
              }
            ],
            as: 'recipe'
          }
        },
        {
          $unwind: '$recipe'
        },
        {
          $project: {
            _id: 1,
            id_recipe: "$recipe.id_recipe",
            id_recipe_detail: "$recipe.id_recipe_detail",
            name: "$recipe.name",
            image_url: "$recipe.image_url",
            total_time: "$recipe.total_time",
            author: "$recipe.author",
            category_details: "$recipe.category_details",
            like: "$recipe.like"
          }
        }
      ]);
    
      return result;
}


export default {
    likeRecipe,
    unlikeRecipe,
    getAllLikeRecipes
}