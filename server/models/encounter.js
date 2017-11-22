import mongoose, { Schema } from 'mongoose'

const encounterSchema = Schema({
    name: {
      type: String
    },
    mail: {
      type: String
    },
    phone: {
      type: String
    },
    comment: {
        type: String
    },
    price: {
        type: Number
    }
});

export default mongoose.model('Encounter', encounterSchema)
