const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    chargesStartedWith: {
      type: Number,
    },
    profilePic: {},
    imageUrls: [],
    city: {
      type:String,
      required: true
    },
    currentbookings: [{ bookingid: String, fromdate: String, todate: String, userid: String, status: String },
    ],
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const serviceModel = mongoose.model('services', serviceSchema)

module.exports = serviceModel;