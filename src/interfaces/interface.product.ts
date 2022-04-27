import { Product } from './../models/model.product';
export interface ProductInterface {
  AddProduct(productData: Product): any;
  EditProduct(productData: Product): any;
  GetProductList():any;
}
