import mongoose, { Schema } from "mongoose";
export default mongoose.model('CategoryDetail',
new Schema({
    id_category_detail: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    url_image: {
        type: String,
        required: true
    }
}))