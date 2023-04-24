import {Category} from '../models/index.js';
import Exception from '../exceptions/Exception.js'

const getAllCategories = async () => {
    try {
       const allCategories = await Category.aggregate([
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
            id_category: 1,
            name: 1,
            category_details: {
              _id: 1,
              name: 1,
              url_image: 1
            }
          }
        }
      ])

      return allCategories

    } catch (exception) {
      console.error(exception);
    }
  };

export default {
    getAllCategories,
}