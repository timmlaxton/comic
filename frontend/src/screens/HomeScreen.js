import React, { useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import ProductCarousel from '../components/ProductCarousel'
import {listProducts} from '../actions/productActions' 


const HomeScreen = ({match}) => {
  const keyword = match.params.keyword

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const {loading, error, products} = productList

  useEffect(() => {
    dispatch(listProducts())
  },[dispatch])


  return (
    <>
    {!keyword && <ProductCarousel/>}
    <br/>
    <h4>We are a specialist back issue comic shop based in Glasgow.  We also stock new monthly comics, graphic novels, t-shirts and toys.
        Thousands of titles in stock we buy sell and exchange Marvel, DC and indie comics.
        Glasgow's best Silver/Bronze Age comic dealer - a large selection always in stock!</h4>
        <br/>
      <h1>Comics</h1>
  {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
       <Row>
       {products.map(product => (
         <Col key={product._id} sm={4} md={4} lg={4} xl={3}>
           <Product product={product} />
         </Col>
       ))}
      </Row>
        }
        <h1>Trades</h1>
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
       <Row>
       {products.map(product => (
         <Col key={product._id} sm={4} md={4} lg={4} xl={3}>
           <Product product={product} />
         </Col>
       ))}
      </Row>
        }
    </>
  )
}

export default HomeScreen
