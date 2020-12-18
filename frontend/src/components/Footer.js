import React from 'react'
import {Container, Col, Row} from 'react-bootstrap'


const Footer = () => {
  return (
    <footer classname="bg-light text-center text-lg-start">
      <Container className="p-4"> 
        <Row>
          <Col lg={2} md={2} className='hours'>
            <h5 className="text-uppercase">Opening Hours</h5>

            <p>
            11am to 4pm - Wednesday to Saturday
            </p>
            <p>
            12pm to 4pm - Sunday
            </p>
           <p> 
            Closed Monday to Tuesday
            </p>

           
          </Col>
          <Col lg={2} md={2} className='contact'>
            <h5 className="text-uppercase">Contact Us</h5>
            <p>
            citycentrecomics@hotmail.com
            </p>
            <p>
            0141 357 6325
            </p>
            <p>
            37 Ruthven Lane, G12 9BG
            Glasgow
              </p>
            </Col>

            <Col lg={2} md={22} className='follow'>
            <h5 className="text-uppercase">Follow Us</h5>
            <div>   
       <a href={"https://www.facebook.com/citycentrecomics"}>
       <i className="fab fa-facebook-f" ></i>
       </a>
      </div> 
     <div>   
       <a href={"https://twitter.com/citycentrecomic"}> 
      <i className="fab fa-twitter"></i>
      </a>
      </div> 
      
            </Col>
            
        </Row>
        <div className="copyright">Copyright &copy; City Centre Comics </div>
      </Container>
    </footer>
  )
}

export default Footer
