import mongoose, { Schema } from 'mongoose'

const encounterSchema = Schema({
    name: {
      type: String
    },
    skype: {
        type: String,
        default: ''
    },
    mail: {
      type: String
    },
    phone: {
      type: String
    },
    issue: {
        type: String
    },
    comment: {
        type: String
    },
    order: {
        skype: {
            week: {
                type: Number,
                default: 0
            },
            cost: {
                type: Number,
                default: 0
            },
            duration: {
                type: Number,
                default: 0
            }
        },
        email: {
           week: {
               type: Number,
               default: 0
           },
            cost: {
               type: Number,
                default: 0
            }
        }
    },
    price: {
        type: Number,
        default: 0
    },
    date: {
        type: Date
    }
});

export default mongoose.model('Encounter', encounterSchema)
