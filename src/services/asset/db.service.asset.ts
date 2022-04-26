import { Asset } from './../../models/model.asset';
import { MongoClient } from 'mongodb';
import { ConfigService } from './../utility/configService';
const config = ConfigService.getInstance().getConfig();
export class DbAsset {
  private collectionName: string;
  private static dbAsset: DbAsset;
  private constructor() {
    this.collectionName = 'asset';
  }
  /**
   * static getInstance
   */
  public static getInstance() {
    if (!DbAsset.dbAsset) {
      DbAsset.dbAsset = new DbAsset();
    }
    return DbAsset.dbAsset;
  }
  private async getDbConnection() {
    try {
      const dbConnection = await new MongoClient(config.mongo.url).connect();
      return dbConnection;
    } catch (error) {
      console.log('Error in getDbConnection method of DbAsset');
    }
  }
  public async CreateAsset(assetData: Asset) {
    return new Promise(async (resolve, reject) => {
      try {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.url);
        const dbCollection = db.collection(this.collectionName);
        const result = await dbCollection.insertOne(assetData);
        await dbConn.close();
        if (result) {
          resolve('success');
        } else {
          reject('failed');
        }
      } catch (error) {
        console.log('Error in CreateAsset method of DbAsset: ', error);
      }
    });
  }
}
