export class Product {
  assetId?: string;
  brand?: string;
  invoiceNumber?: string;
  description?: string;
  quantity?: number;
  _id?:any;
  pid?:any;

  private static product: Product;
  private constructor() {}
  /**
   * static getInstance
   */
  public static getInstance() {
    if (!Product.product) {
      Product.product = new Product();
    }
    return Product.product;
  }
}
