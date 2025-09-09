import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  categoryName: string;
  parentCategoryId?: mongoose.Types.ObjectId | null;
  status: "active" | "inactive";
  createdBy: string;
  createdAt: Date;
}


const CategorySchema: Schema = new Schema({
  categoryName: { type: String, required: true, unique: true },
  parentCategoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  createdBy: { type: String, default: "system" }, 
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ICategory>("Category", CategorySchema);
