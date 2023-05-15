import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from 'sweetalert2'

const Adminscreen = () => {
  const items = [
    {
      key: "1",
      label: <b>Bookings</b>,
      children: (
        <>
          <Bookings />
        </>
      ),
    },
    {
      key: "2",
      label: <b>Worker</b>,
      children: (
        <>
          <Services />
        </>
      ),
    },
    {
      key: "3",
      label: <b>Add Worker</b>,
      children: (
        <>
          
            <Addservice/>
         
        </>
      ),
    },
    {
      key: "4",
      label: <b>Users</b>,
      children: (
        <>
          <Users/>
        </>
      ),
    },
  ];

  useEffect(()=>{

    if(!JSON.parse(localStorage.getItem("currentUser")).isAdmin){
        window.location.href="/home"
    }
  },[])

  return (
    <div className="ml-3 mr-3 mt-3 bs">
      <h3 className="text-center" style={{ fontSize: "25px" }}>
        {" "}
        <b>Admin Panel</b>{" "}
      </h3>
      <Tabs defaultActiveKey="1" items={items}></Tabs>
    </div>
  );
};

export default Adminscreen;


// ServicesList Component

export function Services() {
  const [services, setservices] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = (await axios.get("/api/services/getallservices")).data;
        setservices(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        {loading && <Loader />}

        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Service Id</th>
              <th>Name</th>
              <th>Service</th>
              <th>City</th>
              <th>Worker Charges</th>
              <th>Phone Number</th>
            </tr>
          </thead>

          <tbody>
            {services.length &&
              services.map((service) => {
                return (
                  <tr>
                    <td>{service._id}</td>
                    <td>{service.name}</td>
                    <td>{service.service}</td>
                    <td>{service.city}</td>
                    <td>{service.chargesStartedWith}</td>
                    <td>{service.phoneNumber}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
 
// BookingList Component

export function Bookings() {
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = (await axios.get("/api/bookings/getallbookings")).data;
        setbookings(data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        {loading && <Loader />}

        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Booking Id</th>
              <th>User Id</th>
              <th>Service</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length &&
              bookings.map((booking) => {
                return (
                  <tr>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.service}</td>
                    <td>{booking.fromdate}</td>
                    <td>{booking.todate}</td>
                    <td>{booking.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// UsersList Component

export function Users(){

    const [users, setusers] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = (await axios.get("/api/users/getallusers")).data;
            setusers(data);
            setloading(false);
          } catch (error) {
            console.log(error);
            setloading(false);
            seterror(error);
          }
        };
        fetchData();
      }, []);

      return (
        <div className="row">

       <div className="col-md-12">
        {loading && (<Loader/>)}
       </div>
          <table className="table table-bordered table-dark">
     
             <thead>
                <tr>
                    <th>User Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Is Admin</th>
                </tr>
             </thead>

             <tbody>
                {users && (users.map(user=>{
                    return <tr>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.isAdmin ? "YES" : "NO"}</td>
                    </tr>
                }))}
             </tbody>

          </table>
        </div>
      )
}


// AddService Component

export function Addservice(){

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [name,setname] = useState("")
    const [city,setcity] = useState("")
    const [chargesStartedWith,setchargesStartedWith] = useState("")
    const [phoneNumber,setphoneNumber] = useState("")
    const [description,setdescription] = useState("")
    const [service,setservice] = useState("")
    const [imageurl1,setimageurl1] = useState("")
    const [imageurl2,setimageurl2] = useState("")

   async function addService(){

        const newservice = {
            name,
            city,
            chargesStartedWith,
            phoneNumber,
            description,
            service,
            imageurls:[ imageurl1,
            imageurl2]
        }
       
        try {
            setloading(true)
            const result= (await axios.post("/api/services/addservice" , newservice)).data
            console.log(result)
            setloading(false)
            Swal.fire("Congratulations","Your new service added successfully","success").then(result=>{
                window.location.href="/home"
            })
        } catch (error) {
            console.log(error)
            seterror(error)
            Swal.fire("Oops","Something went wrong","error")
        }
    }

    return (
        <div className="row">
           <div className="col-md-5">
            {loading && (<Loader/>)}

            <input type="text" className="form-control" placeholder="Worker name" 
            value={name} onChange={(e)=>{setname(e.target.value)}} />
            <input type="text" className="form-control" placeholder="City" 
            value={city} onChange={(e)=>{setcity(e.target.value)}} />
            <input type="text" className="form-control" placeholder="Worker charges" 
            value={chargesStartedWith} onChange={(e)=>{setchargesStartedWith(e.target.value)}} />
            <input type="text" className="form-control" placeholder="Phone Number" 
            value={phoneNumber} onChange={(e)=>{setphoneNumber(e.target.value)}} />
            <input type="text" className="form-control" placeholder="Description" 
            value={description} onChange={(e)=>{setdescription(e.target.value)}} />

           </div>

           <div className="col-md-5">

           <input type="text" className="form-control" placeholder="Service" 
           value={service} onChange={(e)=>{setservice(e.target.value)}} />
           <input type="text" className="form-control" placeholder="Image URL 1" 
           value={imageurl1} onChange={(e)=>{setimageurl1(e.target.value)}} />
           <input type="text" className="form-control" placeholder="Image URL 2" 
           value={imageurl2} onChange={(e)=>{setimageurl2(e.target.value)}} />
          
             
             <div className="text-right">
                <button className="btn btn-primary mt-5 " onClick={addService}>Add Worker</button>
             </div>
           </div>
        </div>
    )
}