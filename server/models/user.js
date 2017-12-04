import mongoose, { Schema } from 'mongoose'

const UserSchema = Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export default mongoose.model('User', UserSchema)
