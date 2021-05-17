import ProductModel, { ProductDocument } from "@models/product";
import { Currency } from "types";

interface AddProductDto {
  userId: string;
  name: string;
  currency: Currency;
  price: number;
  messages: any[];
}
export const createProduct = (
  addProductDto: AddProductDto
): Promise<ProductDocument> => {
  return ProductModel.create({
    ...addProductDto,
    expire: new Date("2022-01-01"),
  });
};

export const getProducts = (
  userId: string | number
): Promise<ProductDocument[]> => {
  return ProductModel.find({ userId }).sort({ created: -1 }).exec();
};
