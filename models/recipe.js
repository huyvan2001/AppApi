
import mongoose,{Schema} from "mongoose";

export default mongoose.model('Recipe',
 new Schema({
    id_recipe:{
        type: String,
        required: true
    },
    id_category_detail:{
        type: [String],
        required: true
    },
    id_recipe_detail:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    image_url:{
        type: String,
        required: true
    },
    total_time:{
        type: Number,
        required: true
    },
    serves:{
        type: Number,
        required: true
    },
    kcal:{
        type: Number,
        required: true
    },
    id_ingredient:{
        type: [String],
        required: true
    },
    author:{
        type: [String],
        required: true
    },
    id_collection:{
        type: String
    }
 })
)

