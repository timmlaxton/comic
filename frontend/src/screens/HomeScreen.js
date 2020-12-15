import React, { useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, Card} from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import HeroCarousel from 'react-hero-carousel'
import {listProducts} from '../actions/productActions' 


const HomeScreen = ({match}) => {
  const keyword = match.params.keyword

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const {loading, error, products} = productList
  const [productsByCategory, setProductsByCategory] = useState({})
  
  
  useEffect(() => {
    dispatch(listProducts())
  },[dispatch])

  useEffect(() => {
    let productsByCategory = getProductsByCategory(products)
    setProductsByCategory(productsByCategory)
  }, [products])

  function getProductsByCategory(products = []) {
    return products.reduce((acc, product) => {
      const {category} = product
      if (!Object.prototype.hasOwnProperty.call(acc, category)) {
        acc[category] = []
      }

      acc[category].push(product)
      return acc
    }, {})
  }


  return (
    <>
   
   
    {!keyword && <HeroCarousel>
      
    <img
      alt=""
      src="images/fan1.jpg"
      width="85%"
      height="100%"
      pos
    />
    
      
      </HeroCarousel>}
    <br/>
    <hr className="solid"/>
    <h4>We are a specialist back issue comic shop based in Glasgow.  We also stock new monthly comics, graphic novels, t-shirts and toys.
        Thousands of titles in stock we buy sell and exchange Marvel, DC and indie comics.
        Glasgow's best Silver/Bronze Age comic dealer - a large selection always in stock!</h4>
        <hr className="solid"/>
        
      <h1>Back Issues</h1>
      <hr className="solid"/>
  {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
       <Row>
       {productsByCategory?.['Back Issue']?.map(product => (
         <Col key={product._id} sm={2} md={2} lg={2} xl={2}>
           <Product product={product} />
         </Col>
       ))}
      </Row>
        }
         
         <Card className="card-advert">
  <Card.Img src="images/x.jpg" alt="Card image" />
  <Card.ImgOverlay>
    <Card.Title>Card title</Card.Title>
    <Card.Text>
      This is a wider card with supporting text below as a natural lead-in to
      additional content. This content is a little bit longer.
    </Card.Text>
    <Card.Text>Last updated 3 mins ago</Card.Text>
  </Card.ImgOverlay>
</Card>


    <hr className="solid"/>
        <h1>New Comics</h1>
        <hr className="solid"/>
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
       <Row>
         {productsByCategory?.['New Comics']?.map(product => (
         <Col key={product._id} sm={2} md={2} lg={2} xl={2}>
           <Product product={product} />
         </Col>
       ))}
      </Row>
        }
        
        <Card className="card-advert">
  <Card.Img src="images/x.jpg" alt="Card image" />
  <Card.ImgOverlay>
    <Card.Title>Card title</Card.Title>
    <Card.Text>
      This is a wider card with supporting text below as a natural lead-in to
      additional content. This content is a little bit longer.
    </Card.Text>
    <Card.Text>Last updated 3 mins ago</Card.Text>
  </Card.ImgOverlay>
</Card>
  <hr className="solid"/>
 
         <h1>Trades</h1>
         <hr className="solid"/>
  {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
       <Row>
         {productsByCategory?.['Trades']?.map(product => (
         <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
           <Product product={product} />
         </Col>
       ))}
      </Row>
        }
        
    </>
  )
}

export default HomeScreen
