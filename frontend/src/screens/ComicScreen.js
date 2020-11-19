import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Route} from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import SearchBox from '../components/SearchBox'
import { listProducts } from '../actions/productActions'



const ComicScreen = ({match}) => {
  
  const keyword = match.params.keyword
  const products = useSelector((state) => {
    console.log({state})
    return state.productList.products
  })
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listProducts(keyword))
   
  },[dispatch, keyword])


  return (
    <>
    <Route render={({history}) => <SearchBox history={history} />} />
      <h1>Comics</h1>
      <Row>
       {products.map(product => (
         <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
           <Product product={product} />
         </Col>
       ))}
      </Row>
    </>
  )
}

export default ComicScreen
