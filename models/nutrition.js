import mongoose, { Schema } from "mongoose";
export default mongoose.model('Nutrition',
new Schema({
    id_nutrition: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    }
}))