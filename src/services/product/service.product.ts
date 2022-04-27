import { Product } from './../../models/model.product';
import { ProductInterface } from './../../interfaces/interface.product';
import { DbProduct } from './db.service.product';
const dbProduct = DbProduct.getInstance();
export class ProductService implements ProductInterface {
  private static productService: ProductService;
  private constructor() {}

  public AddProduct(productData: Product) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await dbProduct.CreateProduct(productData);
        if (result === 'success') {
          resolve('Product Added Successfully');
        } else {
          resolve('Failed to Add Product');
        }
      } catch (error) {
        console.log('Error in AddProduct Method of ProductService:', error);
      }
    });
  }
  public EditProduct(productData: Product) {
    throw new Error('Method not implemented.');
  }
  /**
   * static getInstance
   */
  public static getInstance() {
    if (!ProductService.productService) {
      ProductService.productService = new ProductService();
    }
    return ProductService.productService;
  }
  public GetProductList() {
    return new Promise(async (resolve, reject) => {
      await dbProduct
        .GetProductList()
        .then((result) => {
          resolve(result);
        })
        .catch((err) => reject(err));
    });
  }
}
