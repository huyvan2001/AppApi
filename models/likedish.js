import mongoose, { Schema } from "mongoose";
export default mongoose.model('LikeDish',
new Schema({
    id_like_dish: {
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