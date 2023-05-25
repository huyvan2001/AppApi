import mongoose, { Schema } from "mongoose";
export default mongoose.model('Serve',
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