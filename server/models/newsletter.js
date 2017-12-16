import mongoose, { Schema } from 'mongoose'

const newsletterSchema = Schema({
    email: {
        type: String
    }
});

export default mongoose.model('Newsletter', newsletterSchema)
