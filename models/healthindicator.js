import mongoose, { Schema } from "mongoose";
export default mongoose.model('HealthIndicator',
new Schema({
    id_user: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
}))