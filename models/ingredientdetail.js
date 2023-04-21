import mongoose, { Schema } from "mongoose";
export default mongoose.model('IngredientDetail',
new Schema({
    id_ingredient_detail: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    pronunciation: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: [String],
        required: true
    }

}))