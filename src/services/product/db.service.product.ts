import { Product } from './../../models/model.product';
import { MongoClient, ObjectId } from 'mongodb';
import { ConfigService } from './../utility/configService';
const config = ConfigService.getInstance().getConfig();
export class DbProduct {
  private collectionName: string;
  private static dbProduct: DbProduct;
  private constructor() {
    this.collectionName = 'product';
  }
  /**
   * static getInstance
   */
  public static getInstance() {
    if (!DbProduct.dbProduct) {
      DbProduct.dbProduct = new DbProduct();
    }
    return DbProduct.dbProduct;
  }
  private async getDbConnection() {
    try {
      const dbConnection = await new MongoClient(config.mongo.url).connect();
      return dbConnection;
    } catch (error) {
      console.log('Error in getDbConnection method of DbProduct');
    }
  }
  public async CreateProduct(productData: Product) {
    return new Promise(async (resolve, reject) => {
      try {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        const result = await dbCollection.insertOne(productData);
        await dbConn.close();
        if (result) {
          resolve('success');
        } else {
          reject('failed');
        }
      } catch (error) {
        console.log('Error in CreateProduct method of DbProduct: ', error);
      }
    });
  }
  /**
   * GetProductList
   */
  public GetProductList() {
    return new Promise(async (resolve, reject) => {
      try {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        const result = await dbCollection.find().sort({ brand: -1 }).toArray();
        if (result) {
          resolve(result);
        } else {
          reject('error getting the asset type');
        }
      } catch (error) {
        console.log('error getting the asset type');
      }
    });
  }

  public async EditProductById(productId: string, product: Product) {
    return new Promise(async (resolve, reject) => {
      try {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        const result = await dbCollection.updateOne(
          { _id: new ObjectId(productId) },
          {
            $set: {
              assetId: product.assetId,
              brand: product.brand,
              invoiceNumber: product.invoiceNumber,
              description: product.description,
              quantity: product.quantity,
            },
          }
        );
        await dbConn.close();
        if (result) {
          resolve('success');
        } else {
          reject('failed');
        }
      } catch (error) {
        console.log('Error in EditProductById method of DbProduct: ', error);
      }
    });
  }
  /**
   * GetProductById
   */
  public GetProductById(productId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        if (ObjectId.isValid(productId)) {
          const dbConn = await this.getDbConnection();
          const db = dbConn.db(config.mongo.dbName);
          const dbCollection = db.collection(this.collectionName);
          const productResult = await dbCollection.findOne({
            _id: new ObjectId(productId),
          });
          if (productResult) {
            resolve(productResult);
          } else {
            reject('error getting the product');
          }
        } else {
          reject('Id is not Valid');
        }
      } catch (error) {
        console.log('Error in GetProductById method of DbProduct: ', error);
      }
    });
  }
}
