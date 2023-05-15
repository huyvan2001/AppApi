import mongoose, { Schema } from "mongoose";
export default mongoose.model('Save',
new Schema({
    id_user: {
        type: String,
        required: true
    },
    id_recipe: {
        type: String,
        required: true
    },
    is_save: {
        type: Boolean,
        required: true
    }
}))