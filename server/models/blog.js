import mongoose, { Schema } from 'mongoose'

const blogSchema = Schema({
    title: {
        type: String
    },
    text: {
        type: Array
    },
    author: {
        type: Object
    },
    hash: {
        type: String
    },
    date: {
        type: String
    },
    image: {
        type: Array
    },
    video: {
        type: String
    }
});

export default mongoose.model('Blog', blogSchema)
