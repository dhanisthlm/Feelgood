import mongoose, { Schema } from 'mongoose'

const contactSchema = Schema({
    name: {
        type: String
    },
    mail: {
        type: String
    },
    comment: {
        type: String
    }
});

export default mongoose.model('Contact', contactSchema)
