import mongoose, { Schema } from "mongoose";
export default mongoose.model('HealthGoal',
new Schema({
    id_user: {
        type: String,
        required: true
    },
    target_weight: {
        type: Number,
        required: true
    },
    id_physical_healthy_level: {
        type: String,
        required: true
    },
    day_goal: {
        type: Number,
        required: true
    },
    create_at: {
        type: Date,
        required: true
    },
    is_finished: {
        type: Boolean,
        required: true
    }
}))