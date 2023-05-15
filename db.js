const mongoose = require("mongoose");

const mongoURL =
  "mongodb+srv://avnish:avnish@cluster0.ogymcel.mongodb.net/SkilledLabour";

mongoose
  .connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("MongoDb Connection Successful"))
  .catch((error) => console.log(error.message));

module.exports = mongoose;
