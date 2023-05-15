import mongoose, { Schema } from "mongoose";
export default mongoose.model('HealthCare',
new Schema({
    id_heath_care: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    key:{
        type: String,
        required: true
    }
})) 