import mongoose, { Schema } from "mongoose";
export default mongoose.model('Plan',
new Schema({
    id_plan: {
        type: String,
        required: true
    },
    id_plan_detail: {
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