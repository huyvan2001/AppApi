
import mongoose,{Schema} from "mongoose";

export default mongoose.model('RecipeDetail',
 new Schema({
    id_recipe_detail:{
        type: String,
        required: true
    },
    id_recipe_nutrition:{
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
    prep_time:{
        type: String,
        required: true
    },
    cook_time:{
        type: String,
        required: true
    },
    serves:{
        type: Number,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    ingerdients_detail:{
        type: [String],
        required: true
    },
    method:{
        type: [String],
        required: true
    }
 })
)

