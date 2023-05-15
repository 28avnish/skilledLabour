import React,{useState} from 'react'
import {Modal, Button, Carousel} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function Service({service, fromdate, todate}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='row bs mb-2 '>
       <div className='col-md-4'>
        <img src={service.profilePic} className="smallimg"/>
        </div>
        <div className='col-md-7 mt-3'>
            <b><h1> Service: {service.service}</h1>
            <p>Name: {service.name}</p>
            <p> Phonenumber: {service.phoneNumber}</p>
            <p> ChargesStartedWith: {service.chargesStartedWith}</p>
            <p> City: {service.city}</p></b>

            <div style={{float:'right'}}> 
            {(fromdate && todate) && (<Link to={`/book/${service._id}/${fromdate}/${todate}`}>
              <button className='btn btn-primary margin-right'>Book Now</button>
              </Link>)}
              
                <button className='btn btn-primary' onClick={handleShow}>View Details</button>
            </div>

            </div>    


      <Modal show={show} onHide={handleClose} size='lg' >
        <Modal.Header closeButton>
          <Modal.Title>{service.service}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <Carousel prevLabel="" nextLabel="">
      {service.imageUrls.map(url=>{
        return <Carousel.Item>
        <img
          className="d-block w-100 bigimg"
          src={url}
          
        />
        
      </Carousel.Item>
      }) }
      
      
    </Carousel>
    <p> {service.description}</p>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default Service