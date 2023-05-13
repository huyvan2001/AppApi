import {Calendar} from "../models/index.js"
import Exception from '../exceptions/Exception.js'
const createCalendar = async ({
    id_user,
    id_recipe,
    date,
    create_at
}) => {

    if (!id_recipe || !date || !create_at) {
        throw new Exception(Exception.FIELD_NOT_FILLED)
    }

   await Calendar.create({
    id_user,
    id_recipe,
    date,
    create_at
   })
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
                  name: 1,
                  url_image: 1
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
          create_at: 1,
          recipe: 1
        }
      }
    ]);
  
    return result;
  };
  

export default {
    createCalendar,
    getAllDaysCalendar,
    getRecipeByDay
}