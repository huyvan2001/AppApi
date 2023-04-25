import {IngredientDetail} from "../models/index.js";

const getIngredientDetailByID = async(id_ingredient_detail) => {
    try {
        let details = IngredientDetail.aggregate([
            {
                $match:{id_ingredient_detail: id_ingredient_detail}
            },
            {
                $project:{
                    name:1,
                    image_url:1,
                    pronunciation:1,
                    info:1,
                    title:1,
                    description:1
                }
            }
        ])
        return details
    }
    catch{

    }
}

export default {
    getIngredientDetailByID
}