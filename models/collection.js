import mongoose, { Schema } from "mongoose";
export default mongoose.model('Collection',
new Schema({
    id_collection: {
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
    description: {
        type: String,
        required: true
    }
}))