import mongoose, { Schema } from 'mongoose'

const newsletterSchema = Schema({
    email: {
        type: String
    },
    date: {
        type: Date
    },
});

export default mongoose.model('Newsletter', newsletterSchema)
