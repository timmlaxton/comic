import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {listStandingOrderDetails, updateStanding } from '../actions/standingActions'
import { STANDING_ORDER_UPDATE_RESET } from '../constants/standingConstants';

const StandingOrderEditScreen = ({match, history }) => {
  const standingId = match.params.id

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [email, setEmail] = useState('')
  const [writer, setWriter] = useState('')
  const [publisher, setPublisher] = useState('')
  
  
  const dispatch = useDispatch()

  
  const standingOrderDetails = useSelector((state) => state.standingOrderDetails)
  const { loading, error, standing} = standingOrderDetails

  const standingOrderUpdate = useSelector((state) => state.standingOrderUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate} = standingOrderUpdate

  useEffect(() => {
      if(successUpdate) {
        dispatch({type: STANDING_ORDER_UPDATE_RESET})
          history.push('/admin/standingOrderList')
      } else {
        if (!standing.name || standing._id !== standingId) {
          dispatch(listStandingOrderDetails(standingId))
        } else {
          setName(standing.name)
          setAddress(standing.address)
          setContactNumber(standing.contactNumber)
          setEmail(standing.email)
          setWriter(standing.writer)
          setPublisher(standing.publisher)
          
        }
      }
      
   
  },[dispatch, standingId, standing , history, successUpdate])

  
    const submitHandler = (e) => {
      e.preventDefault()
      dispatch
      (updateStanding({
        _id: standingId,
        name,
        contactNumber,
        address,
        email,
        writer,
        publisher,
      }))
    }

   
  return (
    <> 
      <Link to='/admin/standingOrderList' className='btn btn-light my-3'>
        Go Back
      </Link>

    <FormContainer>
      <h1>Edit Standing Order</h1>
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
  
          <Form.Group controlId='Address'>
            <Form.Label>Address</Form.Label>
            <Form.Control 
            type='text' 
            placeholder="Enter Address" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
  
          <Form.Group controlId='contactNumber'>
            <Form.Label>Image</Form.Label>
            <Form.Control 
            type='text' 
            placeholder="Enter contactNumber" 
            value={contactNumber} 
            onChange={(e) => setContactNumber(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Category</Form.Label>
            <Form.Control 
            type='email' 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
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

export default StandingOrderEditScreen
