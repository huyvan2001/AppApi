import mongoose, { Schema } from "mongoose";
export default mongoose.model('Ingredient',
new Schema({
    id_ingredient: {
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
    id_ingredient_detail: {
        type: String,
        required: true
    }
}))