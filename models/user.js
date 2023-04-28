import mongoose, {Schema, ObjectId } from 'mongoose'
export default mongoose.model('User', 
    new Schema({
        id: { type: ObjectId},
        email: {
            type: String,
            required:true
        },
        password: { 
            type: String, 
            required: true
        }
    })
)
