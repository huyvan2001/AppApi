import mongoose, { Schema } from "mongoose";
export default mongoose.model('Calendar',
new Schema({
    id_user: {
        type: String,
        required: true
    },
    id_recipe: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    create_at: {
        type: Date,
        required: true
    }
}))