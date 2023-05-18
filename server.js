const express = require("express");
const mongoose =require("mongoose")
const app = express();
const dbConfig = require("./db");
const servicesRoute = require("./routes/servicesRoute")
const usersRoute = require("./routes/userRoute")
const bookingsRoute= require("./routes/bookingsRoute")
const cors = require("cors");

app.use(express.json())
app.use(cors());
app.get("/",(req,res)=>{
  res.setHeader("Access-Control-Allow-Credentials","true")
  res.send("API is running...")
})
app.use('/api/services', servicesRoute)
app.use('/api/users', usersRoute)
app.use('/api/bookings', bookingsRoute)

const port = process.env.Port || 5000;
app.listen(port, () => {
  console.log(`server is running port number ${port}`);
});
