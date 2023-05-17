import React, { useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2'


function Bookingscreen() { 
  const [loading, setloading] = useState(true);   
  const [error, seterror] = useState();
  const [service, setservice] = useState();
  const { serviceid } = useParams();
  const { fromdate } = useParams();
  const { todate } = useParams();
  const momentfromdate = moment(fromdate, "DD-MM-YYYY")
  const momenttodate = moment(todate, "DD-MM-YYYY")

  const totaldays= moment.duration(momenttodate.diff(momentfromdate)).asDays()+1
  const totalamount = service ? totaldays * service.chargesStartedWith : 0;
 
  useEffect(() => {
    const  fetchData= async ()=>{ 
    if(!localStorage.getItem("currentUser")){
      window.location.href='/login'
    }
   
    try {
      setloading(true);
      const data = (await axios.post("/api/services/getservicebyid", {serviceid: serviceid })).data;
      setservice(data);
      setloading(false);
    } catch (error) {
      setloading(false);
      seterror(true);
    }}
    
    fetchData();
    
  }, [serviceid]);
 
  

  async function onToken(token){

     const bookingDetails = {
        service,
        userid:JSON.parse(localStorage.getItem("currentUser"))._id,
        fromdate,
        todate,
        totalamount,
        totaldays,
        token
      }

      try {
        setloading(true)
        const result = await axios.post('/api/bookings/bookservice', bookingDetails)
        setloading(false)     
        Swal.fire('Congratulations','Your Service Booked Successfully','success').then(result=>{
          window.location.href='/profile'
        })
      } catch (error) {
        setloading(false)
        Swal.fire('Oops','Something Went Wrong','error')
      }

   console.log(token)
   }
  return (
    <div className="m-5">
      {loading ? (<Loader/>)  : service ? (<div>

          <div className="row justify-content-center mt-5 bs" >

            <div className="col-md-6 mt-3">
              <h1><b> Worker Name : {service.name} </b></h1>
              <img src={service.profilePic} className="bookimg" />
            </div>
            <div className="col-md-4 mt-3">
             <div style={{textAlign:'right'}}> <h1>Booking Details</h1>
              <hr/>  
              <b><p>Name :  </p>
              <p>From Date : {fromdate} </p>
              <p>End Date : {todate} </p>
              
            
              </b>
              </div>
              <div style={{textAlign:'right'}}>
                 <b><h1>Amount</h1>
                 <hr/>
                 <p>Total Days : {totaldays} </p>
                 <p>Service Charge per Day : {service.chargesStartedWith} </p>
                 <p>Total Amount : {totalamount} </p></b>
              </div>
              <div style={{float: 'right'}}>
                
                <StripeCheckout
                amount={totalamount * 100}
        token={onToken}
        currency="INR"
        stripeKey="pk_test_51N4NMSSDDaj6lzuQAbLOVGnBCnaHCjiYCkxNiSbj4qVZE26vXyV1KCCnfzPT5nvNlv3L5BpyN7skgjHC29ntxQR000PnLLGYwB"
      >
        <button  className="btn btn-primary" >Pay Now</button>
        </StripeCheckout>
              </div>
            
            </div>
            </div>


      </div>) : (<Error/>)}
    </div>
  );
}

export default Bookingscreen;
