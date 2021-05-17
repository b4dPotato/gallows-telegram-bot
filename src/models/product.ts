import { CURRENCIES, DEFAULT_CURRENCY } from "@constants/index";
import mongoose, { Document } from "mongoose";
import { Currency } from "types";

export interface Product {
  _id: string;
  name: string;
  price: number;
  currency: Currency;
  created: Date;
  expire: Date;
  messages: any[];
}
export type ProductDocument = Product & Document;

export const ProductSchema = new mongoose.Schema({
  userId: String,
  name: String,
  price: Number,
  currency: {
    type: String,
    enum: CURRENCIES,
    default: DEFAULT_CURRENCY,
  },
  created: {
    type: Date,
    default: new Date(),
  },
  expire: Date,
  messages: [Object],
});
ProductSchema.index("userId");
ProductSchema.index({ created: -1 });

const ProductModel = mongoose.model<ProductDocument>("Product", ProductSchema);
export default ProductModel;
