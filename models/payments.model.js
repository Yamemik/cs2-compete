import mongoose from "mongoose";


const paymentsSchema = new mongoose.Schema({
   type: String,
   amount_value: Number,
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
   },
   payment: Object,
});

const PaymentsModel = mongoose.model("Payments", paymentsSchema);

export default PaymentsModel;