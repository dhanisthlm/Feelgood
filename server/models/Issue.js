import mongoose, { Schema } from 'mongoose'

const issueSchema = Schema({
    name: {
        type: String
    }
});

export default mongoose.model('Issue', issueSchema)
