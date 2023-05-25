import mongoose, { Schema } from "mongoose";
export default mongoose.model('Kcal',
new Schema({
    key: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
}))