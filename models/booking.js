const mongoose  = require("mongoose");
const bookingSchema = mongoose.Schema({
    status : {
        type:String,
        required:true,
        default:'booked'
    },
    service : {
        type:String,
        required:true
    },
    serviceid : {
        type:String,
        required:true
    },
    userid : {
        type:String,
        required:true
    },
    fromdate : {
        type:String,
        required:true
    },
    todate : {
        type:String,
        required:true
    },
    totalamount : {
        type:Number,
        required:true
    },
    totaldays : {
        type:Number,
        required:true
    },
    transactionId : {
        type:String,
        required:true
    },
    

},{timestamps:true})

const bookingmodel = mongoose.model('bookings', bookingSchema)
module.exports = bookingmodel 