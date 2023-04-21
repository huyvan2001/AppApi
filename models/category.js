import mongoose, { Schema } from "mongoose";
export default mongoose.model('Category',
new Schema({
    id_category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    id_category_detail: {
        type: [String],
        required: true
    }
}))