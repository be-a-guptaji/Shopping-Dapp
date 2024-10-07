const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  sender: {
    type: String,
  },
  receiver: {
    type: String,
  },
  priceInSol: {
    type: Number,
  }
}, {
  timestamps: true
});
const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
