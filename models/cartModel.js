import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  products: [
    {
      id: {
        type: mongoose.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: {
        type: Number,
      },
    },
  ],
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "users",
  //   required: true,
  //   unique: true,
  // },
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model("Cart", cartSchema);
