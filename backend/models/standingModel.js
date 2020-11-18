import mongoose from 'mongoose'

const standingSchema = mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
    default: 0 
  },
  email: {
    type: String,
    required: true 
  },
  title: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true,
  },
 
}, {
  timestamps: true
})

const Standing = mongoose.model('Standing', standingSchema)

export default Standing