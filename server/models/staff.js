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
        type: String
    }
});

export default mongoose.model('Staff', staffSchema)
