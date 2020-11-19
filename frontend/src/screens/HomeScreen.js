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
  const [featuredProducts, setFeaturedProducts] = useState([])
  useEffect(() => {
    dispatch(listProducts())
  },[dispatch])

  useEffect(() => {
    let featuredProducts = getFeaturedProducts(products)
    setFeaturedProducts(featuredProducts)
  }, [products])

  console.log({products, featuredProducts})

  function getFeaturedProducts(products = []) {
    return products.filter(product => product.featured)
  }

  return (
    <>
    <div className="container"> 
    {/* <div className="jumbotron jumbotron-fluid">
  <div className="container">
    
  </div>
</div> */}
    {!keyword && <HeroCarousel>
      
    <img
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
        <hr class="solid"/>
        
      <h1>Back Issues</h1>
      <hr className="solid"/>
  {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
       <Row>
       {featuredProducts.map(product => (
         <Col key={product._id} sm={4} md={4} lg={4} xl={3}>
           <Product product={product} />
         </Col>
       ))}
      </Row>
        }
         
        <div className="card"   >
      <div className="card-body">
        <Card.Img src='' />
        <h4 className="card-title">Standing Orders</h4>
        <p className="card-text">Never miss out on the latest issues.</p>
        <a href="#" className="btn btn-primary">Standing Order</a>
      </div>
    </div>
    <hr className="solid"/>
        <h1>New Comics</h1>
        <hr className="solid"/>
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
       <Row>
       {products.map(product => (
         <Col key={product._id} sm={4} md={4} lg={4} xl={3}>
           <Product product={product} />
         </Col>
       ))}
      </Row>
        }
        
        <div className="card"   >
      <div className="card-body">
        <Card.Img src='' />
        <h4 className="card-title">Standing Orders</h4>
        <p className="card-text">Never miss out on the latest issues.</p>
        <a href="#" className="btn btn-primary">Standing Order</a>
      </div>
    </div>
  <hr class="solid"/>
 
         <h1>Trades</h1>
         <hr className="solid"/>
  {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
       <Row>
       {products.map(product => (
         <Col key={product._id} sm={4} md={4} lg={4} xl={3}>
           <Product product={product} />
         </Col>
       ))}
      </Row>
        }
        </div>
    </>
  )
}

export default HomeScreen
