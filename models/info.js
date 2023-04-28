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
        favoriteList: { 
            type: [String], 
            required: true
        }
    })
)
