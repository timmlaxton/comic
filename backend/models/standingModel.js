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
  title: {
    type: String,
    required: true,
    
  },
 
  writer: {
    type: String,
    required: true
    
  },
  artist: {
    type: String,
    required: true
    
  },
  publisher: {
    type: String,
    required: true
    
  },
  
  issues: {
    type: Number,
    required: true,
    default: 0
  },
 
}, {
  timestamps: true
})

const Standing = mongoose.model('Standing', standingSchema)

export default Standing