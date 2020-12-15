import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Image} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {listProductDetails, updateProduct, createProduct  } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET, PRODUCT_CREATE_RESET } from '../constants/productContants';

const ProductEditScreen = ({match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('name')
  const [price, setPrice] = useState(0)
  const [issue, setIssue] = useState(0)
  const [imageUrl, setImageUrl] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState(false)
  const [writer, setWriter] = useState('writer')
  const [artist, setArtist] = useState('artist')
  const [publisher, setPublisher] = useState('publisher')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('description')
  const [uploading, setUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const dispatch = useDispatch()  
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product} = productDetails
  const isCreateProductMode = match.path.includes('/admin/product/create')

  const productUpdate = useSelector((state) => isCreateProductMode ? state.productCreate : state.productUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate

  useEffect(() => {
      if(successUpdate) {
        dispatch({type: isCreateProductMode ? PRODUCT_CREATE_RESET : PRODUCT_UPDATE_RESET})
        history.push('/admin/productlist')
        return
      }

      

      if (isCreateProductMode) return

      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setIssue(product.issue)
        setPrice(product.price)
        setImagePreview(product.image)
        setCategory(product.category)
        setWriter(product.writer)
        setArtist(product.artist)
        setPublisher(product.publisher)
        setCountInStock(product.countInStock)
        setDescription(product.description)
        
      }
      
   
  },[dispatch, productId, product , history, successUpdate, isCreateProductMode])

  const onUploadImage = e => {
    const file = e.target.files[0]
    setImage(file)
    if (file) {
      const reader = new FileReader()

      reader.onload = e => {
        setImagePreview(e.target.result)
      }

      reader.readAsDataURL(file)
    } else {
      setImagePreview(null)
    }
  }

  const uploadFileHandler = async () => {
    if (!image) return ''
    const file = image
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const {data} = await axios.post('/api/upload', formData, config)

      // setImage(data)
      return data
      // setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
      throw new Error('There was a problem')
    }
  }

    const submitHandler = async (e) => {
      e.preventDefault()
      let finalImage = imageUrl
      if (!finalImage && image) {
        finalImage = await uploadFileHandler()
      }

      
      const payload = {
        _id: productId,
        name,
        issue,
        price,
        image: finalImage,
        category,
        writer,
        artist,
        publisher,
        countInStock,
        description,
        
      }

      
      dispatch(isCreateProductMode ? createProduct(payload) : updateProduct(payload))
    }

   
  return (
    <> 
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>

    <FormContainer>
  <h1>{isCreateProductMode ? 'Create Product' : 'Edit Product'}</h1>
      {loadingUpdate && <Loader/>}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
          <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control 
            type='name' 
            placeholder="Enter name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='issue'>
            <Form.Label>Issue</Form.Label>
            <Form.Control 
            type='number' 
            placeholder="Enter issue number" 
            value={issue} 
            onChange={(e) => setIssue(e.target.value)}
            ></Form.Control>
          </Form.Group>
  
          <Form.Group controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control 
            type='number' 
            placeholder="Enter price" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>
  
          <Form.Group controlId='image'>
            <Form.Label>Image</Form.Label>
            <Form.Control 
            type='text' 
            placeholder="Enter image url" 
            value={imageUrl} 
            onChange={(e) => setImageUrl(e.target.value)}
            ></Form.Control>

          <Form.File 
            id='image-file' 
            label='Choose File' 
            custom 
            onChange={onUploadImage}></Form.File>
            {uploading && <Loader />}
          </Form.Group>

          {imagePreview ? (<Image src={imagePreview} />) : null}

          <Form.Group controlId="category">
          <Form.Label>Select Category</Form.Label>
          <Form.Control as="select" onChange={(e) => setCategory(e.target.value)}>
            <option value="Back Issue">Back Issues</option>
            <option value="New Comics">New Comics</option>
            <option value="Trades">Trades</option>          
          </Form.Control>
          </Form.Group>
    
          
  
          <Form.Group controlId='writer'>
            <Form.Label>Writer</Form.Label>
            <Form.Control 
            type='text' 
            placeholder="Enter writer" 
            value={writer} 
            onChange={(e) => setWriter(e.target.value)}
            ></Form.Control>
          </Form.Group>
 

          <Form.Group controlId='artist'>
            <Form.Label>Artist</Form.Label>
            <Form.Control 
            type='text' 
            placeholder="Enter artist" 
            value={artist} 
            onChange={(e) => setArtist(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='publisher'>
            <Form.Label>Publisher</Form.Label>
            <Form.Control 
            type='text' 
            placeholder="Enter publisher" 
            value={publisher} 
            onChange={(e) => setPublisher(e.target.value)}
            ></Form.Control>
          </Form.Group>
  
          <Form.Group controlId='countInStock'>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control 
            type='number' 
            placeholder="Enter number of stock" 
            value={countInStock} 
            onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>
  
          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control 
            as='textarea' 
            placeholder="Enter description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            ></Form.Control>
          </Form.Group>

          

          
  
          
          <Button type='submit' variant='primary'>
           {isCreateProductMode ? 'Create' : 'Update'}
          </Button>
        </Form>
  
      )}
      
     
    </FormContainer>
    </>
  )
}

export default ProductEditScreen
