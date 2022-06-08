import { Invoice } from '../../models/model.invoice';
import { ObjectId, MongoClient } from 'mongodb';
import { ConfigService } from '../utility/configService';

const config = ConfigService.getInstance().getConfig();

export class DbInvoice {
  private static dbInvoice: DbInvoice;
  private collectionName: string;
  constructor() {
    this.collectionName = 'invoice';
  }
  /**
   * getInstance
   */
  public static getInstance() {
    if (!DbInvoice.dbInvoice) {
      DbInvoice.dbInvoice = new DbInvoice();
    }
    return DbInvoice.dbInvoice;
  }
  private async getDbConnection() {
    const dbConnection = await new MongoClient(config.mongo.url).connect();
    return dbConnection;
  }
  /**
   * createInvoice
   */
  public async CreateInvoice(invoice: Invoice) {
    try {
      return await new Promise(async (resolve, reject) => {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        invoice.createdAt = new Date();
        const result = await dbCollection.insertOne(invoice);
        if (result) {
          resolve(result);
        } else {
          reject(result);
        }
        await dbConn.close();
      });
    } catch (error) {
      console.log('error in CreateInvoice method of DbInvoice class: ', error);
    }
  }
  public async GetAllInvoice() {
    try {
      return await new Promise(async (resolve, reject) => {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        const result = await dbCollection
          .find({})
          .sort({ createdAt: -1 })
          .toArray();
        if (result) {
          resolve(result);
        } else {
          reject(result);
        }
        await dbConn.close();
      });
    } catch (error) {
      console.log('error in GetAllInvoice method of DbInvoice class: ', error);
    }
  }
  public async GetInvoiceById(invoiceId: string) {
    try {
      return await new Promise(async (resolve, reject) => {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        const result = await dbCollection.findOne({
          _id: new ObjectId(invoiceId),
        });
        if (result) {
          resolve(result);
        } else {
          reject(result);
        }
        await dbConn.close();
      });
    } catch (error) {
      console.log('error in GetAllInvoice method of DbInvoice class: ', error);
    }
  }
  public async EditInvoice(invoiceId: string, invoiceData: Invoice) {
    try {
      return await new Promise(async (resolve, reject) => {
        const { imageName, imagePath, title, amount, cashType, invoiceNumber } = invoiceData;
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        const result = await dbCollection.updateOne(
          { _id: new ObjectId(invoiceId) },
          {
            $set: {
              imageName,
              imagePath,
              cashType,
              title,
              amount,
              invoiceNumber,
            },
          }
        );
        if (result) {
          resolve(result);
        } else {
          reject(result);
        }
        await dbConn.close();
      });
    } catch (error) {
      console.log('error in GetAllInvoice method of DbInvoice class: ', error);
    }
  }
}
