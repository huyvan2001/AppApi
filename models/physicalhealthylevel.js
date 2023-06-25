import mongoose, { Schema } from "mongoose";
export default mongoose.model('PhysicalHealthyLevel',
new Schema({
    id_physical_healthy_level: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
}))