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
    image: {
        type: String
    },
    title: {
        type: String
    },
    text: {
        type: Object
    }
});

export default mongoose.model('Staff', staffSchema)
