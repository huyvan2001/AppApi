import mongoose, { Schema } from "mongoose";
export default mongoose.model('Like',
new Schema({
    id_user: {
        type: String,
        required: true
    },
    id_recipe: {
        type: String,
        required: true
    },
    is_like: {
        type: Boolean,
        required: true
    }
}))