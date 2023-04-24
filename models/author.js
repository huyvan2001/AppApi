import mongoose, { Schema } from "mongoose";
export default mongoose.model('Author',
new Schema({
    name: {
        type: String,
        required: true
    },
    url_image: {
        type: String,
        required: true
    }
}))