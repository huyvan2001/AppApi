import {Calendar} from "../models/index.js"
import Exception from '../exceptions/Exception.js'
const createCalendar = async ({
    id_user,
    id_recipe,
    date,
    type
}) => {

    if (!id_recipe || !date || !type) {
        throw new Exception(Exception.FIELD_NOT_FILLED)
    }

    let existedPlan = await Calendar.findOne({
      id_user: id_user,
      id_recipe: id_recipe,
      type: type
    })

    if (existedPlan) {
      throw new Exception(Exception.RECIPE_EXSITED)
    }

   await Calendar.create({
    id_user,
    id_recipe,
    date,
    type,
    is_delete: false
   })
}

const deleteRecipeByDay = async(_id) => {
    await Calendar.findOneAndUpdate({_id:_id},{is_delete: true})
}

const getAllDaysCalendar = async (id_user) => {
    let result = await Calendar.aggregate([
      {
        $match: { id_user: id_user }
      },
      {
        $group: {
          _id: "$date",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          date: "$_id"
        }
      }
    ]);
    
    return result.map(entry => entry.date);
  };

  const getRecipeByDay = async ({ id_user, date }) => {
    let result = await Calendar.aggregate([
      {
        $match: {
          id_user: id_user,
          is_delete: false,
          $expr: {
            $eq: [
              { $toDate: "$date" },
              { $toDate: date }
            ]
          }
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
                _id: 1,
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
          type: 1,
          recipe: 1
        }
      }
    ]);
  
    return result;
  };
  

export default {
    createCalendar,
    getAllDaysCalendar,
    getRecipeByDay,
    deleteRecipeByDay
}