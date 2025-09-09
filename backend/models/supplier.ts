import mongoose, { Schema, Document } from "mongoose";

export interface ISupplier extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  product: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
}

const SupplierSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  product: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ISupplier>("Supplier", SupplierSchema);
