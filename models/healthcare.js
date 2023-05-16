import mongoose, { Schema } from "mongoose";
export default mongoose.model('HealthCare',
new Schema({
    id_health_care: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    key:{
        type: [String],
        required: true
    }
})) 