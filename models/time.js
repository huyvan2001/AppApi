import mongoose, { Schema } from "mongoose";
export default mongoose.model('Time',
new Schema({
    key: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
}))