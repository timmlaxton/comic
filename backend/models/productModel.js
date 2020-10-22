import mongoose from 'mongoose'

const productSchema = mongoose.Schema(
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
  image: {
    type: String,
    required: true,
    
  },
  category: {
    type: String,
    required: true
    
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
  description: {
    type: String,
    required: true
    
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0
  },
}, {
  timestamps: true
})

const Product = mongoosemodel('Product', productSchema)

export default Product