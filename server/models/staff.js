import mongoose, { Schema } from 'mongoose'

const staffSchema = Schema({
    name: {
        type: String
    },
    fullName: {
        type: String
    },
    direction: {
        type: String
    },
    active: {
        type: Boolean
    },
    image: {
        type: String
    },
    title: {
        type: Object
    },
    text: {
        type: Object
    }
});

export default mongoose.model('Staff', staffSchema)
