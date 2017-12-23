import mongoose, { Schema } from 'mongoose'

const blogSchema = Schema({
    title: {
        type: String
    },
    text: {
        type: Array
    },
    author: {
        type: String
    },
    hash: {
        type: String
    },
    date: {
        type: String
    },
    image: {
        type: String
    },
    video: {
        type: String
    }
});

export default mongoose.model('Blog', blogSchema)
