import mongoose, {Schema } from 'mongoose'
export default mongoose.model('Info', 
    new Schema({
        id_user: 
        {   type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
        gender: { 
            type: Number, 
            required: true
        },
        height: { 
            type: Number, 
            required: true
        },
        weight: { 
            type: Number, 
            required: true
        },
        id_like_dish: { 
            type: [String], 
            required: true
        },
        id_health_care: { 
            type: String, 
            required: true
        }
    })
)
