import React, {useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Row, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listStandingOrders, deleteStandingOrder, createStanding} from '../actions/standingActions'
import {STANDING_ORDER_CREATE_RESET} from '../constants/standingConstants'

const StandingOrderListScreen = ({history, match}) => {
  const dispatch = useDispatch()

  const standingOrderList = useSelector(state => state.standingOrderList)
  const { loading, error, standings} = standingOrderList

  const standingOrderDelete = useSelector(state => state.standingOrderDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete} = standingOrderDelete

  const standingCreate = useSelector(state => state.standingCreate)
  const { loading: loadingCreate, error: errorCreate, success: successCreate, standing: createdStanding} = standingCreate

  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo} = userLogin

  useEffect(() => {
    dispatch({ type: STANDING_ORDER_CREATE_RESET})

    if(!userInfo.isAdmin) {
      history.push('/login')
    }
    if(successCreate) {
      history.push(`/admin/standing/${createdStanding._id}/edit`)
    } else {
      dispatch(listStandingOrders())
    }
    
  }, [dispatch, history, userInfo, successDelete, successCreate, createdStanding])

  const deleteHandler = (id) => {
    if(window.confirm('Are you sure')){
      dispatch(deleteStandingOrder(id))
    }
  }

  const createStandingOrderHandler = () => {
    dispatch(createStanding())
  }

  return (
    <>
    <Row className='align-items-center'>
    <Col>
    <h1>Standing Orders</h1>
    </Col>
    <Col className='text-right'>
      <Button className='my-3' onClick={createStandingOrderHandler}>
        <i className="fas fa-plus"></i> Create Standing Order
      </Button>
    </Col>
    </Row>
     {loadingDelete && <Loader/>}
     {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
     {loadingCreate && <Loader/>}
     {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
  {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
    <Table striped bordered hover responsive className='table-sm'>
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>ADDRESS</th>
          <th>CONTACT NUMBER</th>
          <th>EMAIL</th>
          <th>WRITER</th>
          <th>PUBLISHER</th>
        </tr>
      </thead>
      <tbody>
            {standings.map(standing => (
              <tr key={standing._id}>
                <td>{standing._id}</td>
                <td>{standing.name}</td>
                <td>{standing.address}</td>
                <td>{standing.contactNumber}</td>
                <td>{standing.email}</td>
                <td>{standing.writer}</td>
                <td>{standing.publisher}</td>
                <td>
                  <LinkContainer to={`/admin/standing/${standing._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button variant='danger' className='btn-dm' onClick={() => deleteHandler(standing._id)}>
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody> 
    </Table>
  )}
    </>
  )
}

export default StandingOrderListScreen
