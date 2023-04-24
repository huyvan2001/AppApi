import mongoose, { Schema } from "mongoose";
export default mongoose.model('RecipeNutrition',
new Schema({
    id_recipe_nutrition: {
        type: String,
        required: true
    },
    id_nutrition: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
}))