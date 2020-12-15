import React from 'react'
import {Link} from 'react-router-dom'
import { Card } from 'react-bootstrap'


const Product = ({product}) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>
      
      <Card.Body>
      <Link to={`/product/${product._id}`}>
        
        <Card.Title as='div'>
          <strong>{product.name}</strong>
          </Card.Title>

        <Card.Title as='div'>
          <strong>Issue: #{product.issue}</strong>
          </Card.Title>
          
      </Link>
      <Card.Text > <strong>£{product.price}</strong></Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
