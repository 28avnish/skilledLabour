const express = require("express");
const router = express.Router();
const Service = require("../models/service");
const Booking = require("../models/booking");
const { v4: uuidv4 } = require("uuid");
const stripe = require('stripe')(
  'sk_test_51N4NMSSDDaj6lzuQG3a1pikV5N9SSioQSfwOyeRv0pIRjcInr069AiENADeAtSYIQrEGTRACCXHDQtdv0NK14a7500GEvpXbxp'
);
router.post("/bookservice", async (req, res) => {
  const { service, userid, fromdate, todate, totalamount, totaldays, token } =
    req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.paymentIntents.create(
      {
        amount: totalamount * 100,
        customer: customer.id,
        currency: "inr",
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    
    if (payment) {
     
        const newbooking = new Booking({
          service: service.service,
          serviceid: service._id,
          userid,
          fromdate,
          todate,
          totalamount,
          totaldays,
          transactionId: "1234",
        });

        const booking = await newbooking.save();

        // const servicetemp = await Service.findOne({_id:service._id})
        // servicetemp.currentbookings.push({bookingid: booking._id, fromdate:fromdate, todate:todate})

        // await servicetemp.save()
       }

    res.send("Payment Successful, Your Service is Booked");
  } catch (error) {
     console.error(`Error processing payment: ${error.message}`);
    return res.status(400).json({ error: 'Error processing payment' });
  }
});

router.post("/getbookingsbyuserid",async(req,res)=>{
  const userid = req.body.userid

  try {
    const bookings = await Booking.find({userid: userid})
    res.send(bookings)
  } catch (error) {
    return res.status(400).json({ error: 'Error bookings' });
    
  }
})

router.post("/cancelbooking", async(req,res)=>{

  const {bookingid, serviceid}= req.body

   try {
    const bookingitem= await Booking.findOne({ _id : bookingid
    })
    bookingitem.status = 'cancelled'
    await bookingitem.save()
     
    res.send("Your Booking Cancelled Successfully")

   } catch (error) {
    return res.status(400).json({ error: 'Error cancelled booking' });
   }
})

router.get('/getallbookings', async(req,res)=>{

  try {
    const bookings= await Booking.find()
    res.send(bookings)
  } catch (error) {
    return res.status(400).json({ error: 'Error Getallbookings' });
  }
})

module.exports = router;
