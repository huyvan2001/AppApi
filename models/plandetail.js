import mongoose, { Schema } from "mongoose";

const mealSchema = new Schema({
    meal_type: String,
    id_recipe: String
});

const planSchema = new Schema({
    weekday: String,
    meals: [mealSchema]
}); 

export default mongoose.model('PlanDetail',
new Schema({
    id_plan_detail: {
        type: String,
        required: true
    },
    plan: {
        type: [planSchema],
        required: true
    }
}))