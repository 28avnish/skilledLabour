import React, { useState, useEffect } from "react";
import axios from "axios";
import Service from "../components/Service";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import "antd/dist/reset.css";
import { DatePicker, Space } from "antd";

const { RangePicker } = DatePicker;

function Homescreen() {
  const [services, setservices] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [duplicateservices, setduplicateservices] = useState([]);

  const [searchkey, setsearchkey] = useState("");
  const [type, settype] = useState("all");

  useEffect(() => {
    async function fetchData() {
      try {
        setloading(true);
        const { data } = await axios.get("/api/services/getallservices");
        setservices(data);
        setduplicateservices(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    }
    fetchData();
  }, []);

  function filterByDate(dates) {
    setfromdate(dates[0].format("DD-MM-YYYY"));
    settodate(dates[1].format("DD-MM-YYYY"));
   

    var tempservices = [];
    var availability = true;
    for (const service of duplicateservices) {
      if (service.currentbookings.length > 0) {
        for (const booking of service.currentbookings) {
          if (
            !moment(
              moment(dates[0].format("DD-MM-YYYY")).isBetween(
                booking.fromdate,
                booking.todate
              )
            ) &&
            !moment(
              moment(dates[1].format("DD-MM-YYYY")).isBetween(
                booking.fromdate,
                booking.todate
              )
            )
          ) {
            if (
              dates[0].format("DD-MM-YYYY") !== booking.fromdate &&
              dates[0].format("DD-MM-YYYY") !== booking.todate &&
              dates[1].format("DD-MM-YYYY") !== booking.fromdate &&
              dates[1].format("DD-MM-YYYY") !== booking.todate
            ) {
              availability = true;
            }
          }
        }
      }

      if (availability === true || service.currentbookings.length === 0) {
        tempservices.push(service);
      }

      setservices(tempservices);
    }
  }

  function filterBySearch() {
    
    const tempservices = duplicateservices.filter(service =>
      service.city.toLowerCase().includes(searchkey.toLowerCase())
    )

    setservices(tempservices)
  }

  function filterByType(e){
    settype(e)
    if(e !== 'all'){
      const tempservices = duplicateservices.filter(service=>service.service.toLowerCase()===e.toLowerCase())
      setservices(tempservices)
     }
    else{
      setservices(duplicateservices)
    }

  }

  return (
    <div className="container">
      <div className="row mt-5 bs">
        <div className="col-md-3 ">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>

        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search City"
            value={searchkey}
            onChange={(e)=>{setsearchkey(e.target.value)}}
            onKeyUp={filterBySearch}
          />
        </div>

        <div className="col-md-3 ">
          <select className="form-control"
          value={type}
          onChange={(e)=>{filterByType(e.target.value)}}>

            <option value="all">All Services</option>
            <option value="plumber">Plumber</option>
            <option value="carpenter">Carpenter</option>
            <option value="electrician">Electrician</option>
          </select>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : (
          services.map((service) => {
            return (
              <div className="col-md-9 ">
                <Service
                  service={service}
                  fromdate={fromdate}
                  todate={todate}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;
