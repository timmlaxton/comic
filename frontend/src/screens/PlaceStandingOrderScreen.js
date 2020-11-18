import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listStandingOrders, updateStandingOrder, createStandingOrder } from '../actions/standingActions'
import { STANDING_ORDER_UPDATE_RESET } from '../constants/standingConstants';

const PlaceStandingOrderScreen = ({match, history }) => {
  const standingId = match.params.id

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [email, setEmail] = useState('')
  const [title, setTitle] = useState('')
  const [publisher, setPublisher] = useState('')
  

  const dispatch = useDispatch()
  
  const standingOrderDetails = useSelector((state) => state.standingOrderDetails)
  const { loading, error, standing} = standingOrderDetails

  const standingOrderUpdate = useSelector((state) => state.standingOrderUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate} = standingOrderUpdate

  useEffect(() => {
      if(successUpdate) {
        dispatch({type: STANDING_ORDER_UPDATE_RESET})
          history.push('/')
        } else {
          
          setName(standing.name)
          setAddress(standing.address)
          setContactNumber(standing.contactNumber)
          setEmail(standing.email)
          setTitle(standing.title)
          setPublisher(standing.publisher)
          
        }
      }
      
   
    ,[dispatch, standingId, standing , history, successUpdate])

  

    const submitHandler = (e) => {
      e.preventDefault()
      dispatch
      (updateStandingOrder({
        _id: standingId,
        name,
        address,
        contactNumber,
        email,
        title,
        publisher,
        
      }))
    }


  return (
    <> 
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>

    <FormContainer>
      <h1>Create Standing</h1>
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
  
          <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control 
            type='address' 
            placeholder="Enter Address" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
  
         

          <Form.Group controlId='contactNumber'>
            <Form.Label>contactNumber</Form.Label>
            <Form.Control 
            type='string' 
            placeholder="contactNumber" 
            value={contactNumber} 
            onChange={(e) => setContactNumber(e.target.value)}
            ></Form.Control>
          </Form.Group>
  
          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control 
            type='text' 
            placeholder="Enter email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control 
            type='text' 
            placeholder="Enter title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
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
  
         
  
          
          <Button type='submit' variant='primary'>
           Update
          </Button>
        </Form>
  
      )}
      
     
    </FormContainer>
    </>
  )
}

export default PlaceStandingOrderScreen
