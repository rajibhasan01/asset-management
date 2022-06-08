import { Transaction } from "../../models/model.transaction";
import { MongoClient, ObjectId } from "mongodb";
import { ConfigService } from "../utility/configService";

const config = ConfigService.getInstance().getConfig();

export class DbTransaction {
  private collectionName: string;
  private static dbTransaction: DbTransaction;
  private constructor() {
    this.collectionName = "transaction";
  }
  /**
   * static getInstance
   */

  public static getInstance() {
    if (!DbTransaction.dbTransaction) {
      DbTransaction.dbTransaction = new DbTransaction();
    }
    return DbTransaction.dbTransaction;
  }

  private async getDbConnection() {
    try {
      const dbConnection = await new MongoClient(config.mongo.url).connect();
      return dbConnection;
    } catch (error) {
      console.log("Error in getDbConnection method of DbTransaction");
    }
  }
  public async CreateTransaction(transactionData: Transaction) {
    return new Promise(async (resolve, reject) => {
      try {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        const result = await dbCollection.insertOne(transactionData);
        await dbConn.close();
        if (result) {
          resolve("success");
        } else {
          reject("failed");
        }
      } catch (error) {
        console.log(
          "Error in CreateTransaction method of DbTransaction: ",
          error
        );
      }
    });
  }
  /**
   * GetTransactionList
   */
  public GetTransactionList() {
    return new Promise(async (resolve, reject) => {
      try {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        const result = await dbCollection.find().sort({ name: -1 }).toArray();
        if (result) {
          resolve(result);
        } else {
          reject("error getting ther transaction type");
        }
      } catch (error) {
        console.log("error getting the asset type");
      }
    });
  }
  /**
   * EditTransaction
   */
  public EditTransaction(productId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        const query = { productId, status: "1" };
        const result = await dbCollection.updateOne(query, {
          $set: {
            status: "0",
          },
        });
        await dbConn.close();
        if (result) {
          resolve("success");
        } else {
          reject("failed");
        }
      } catch (error) {
        console.log(
          "Error in EditTransactionById method of DbTransaction: ",
          error
        );
      }
    });
  }
  /**
   * EditTransactionById
   */
  public EditTransactionById(transactionId: string, transaction: Transaction) {
    return new Promise(async (resolve, reject) => {
      try {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        const result = await dbCollection.updateOne(
          { _id: new ObjectId(transactionId) },
          {
            $set: {
              productId: transaction.productId,
              ticketNumber: transaction.ticketNumber,
              status: transaction.status,
            },
          }
        );
        await dbConn.close();
        if (result) {
          resolve("success");
        } else {
          reject("failed");
        }
      } catch (error) {
        console.log(
          "Error in EditTransactionById method of DbTransaction: ",
          error
        );
      }
    });
  }
  /**
   * GetTransactionByID
   */
  public GetTransactionById(transactionId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        const result = await dbCollection.findOne({
          _id: new ObjectId(transactionId),
        });
        if (result) {
          resolve(result);
        } else {
          reject("could not find any transaction of this id");
        }
      } catch (error) {
        console.log(
          "Error in GetTransactionById method of DbTransaction: ",
          error
        );
        reject("Error in GetTransactionById methos of DbTransaction: ");
      }
    });
  }
  /**
   * GetTransactionByProductId
   */
  public GetTransactionByProductId(productId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        const result = await dbCollection.find({ productId }).toArray();
        if (result) {
          resolve(result);
        } else {
          reject("could not find any transaction of this id");
        }
      } catch (error) {
        console.log(
          "Error in GetTransactionById method of DbTransaction: ",
          error
        );
        reject("Error in GetTransactionById methos of DbTransaction: ");
      }
    });
  }
}
