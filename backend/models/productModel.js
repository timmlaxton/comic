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
  issue: {
    type: Number,
    required: true
  },
  image: {
    type: String,    
  },
  category: {
    type: String,
    required: true
    
  },
  featured: {
    type: Boolean,
    default: false,
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
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const Product = mongoose.model('Product', productSchema)

export default Product