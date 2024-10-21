import { model , Schema} from "mongoose";

export const Order = model("Order", {
    orderNumber: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    cartItems: { type: Array, required: true },
    totalAmount: { type: Number, required: true },
    discount: { type: Number, required: true },
    finalAmount: { type: Number, required: true },
    address: { type: Object, required: true },
    paymentMethod: { type: Object, required: true },
    date: { type: Date, default: Date.now },
});