import { Asset } from './../../models/model.asset';
import { MongoClient, ObjectId } from 'mongodb';
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
        const db = dbConn.db(config.mongo.dbName);
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
  /**
   * GetAssetTypeList
   */
  public GetAssetList() {
    return new Promise(async (resolve, reject) => {
      try {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        const result = await dbCollection.find().sort({ name: -1 }).toArray();
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
  public async EditAssetById(assetId: string, asset: Asset) {
    return new Promise(async (resolve, reject) => {
      try {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        const result = await dbCollection.updateOne(
          { _id: new ObjectId(assetId) },
          {
            $set: {
              name: asset.name,
              description: asset.description,
              assetType: asset.assetType,
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
        console.log('Error in EditAssetById method of DbAssetType: ', error);
      }
    });
  }
  /**
   * GetAssetTypeById
   */
  public GetAssetById(assetId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        if (ObjectId.isValid(assetId)) {
          const dbConn = await this.getDbConnection();
          const db = dbConn.db(config.mongo.dbName);
          const dbCollection = db.collection(this.collectionName);
          const assetTypeResult = await dbCollection.findOne({
            _id: new ObjectId(assetId),
          });
          if (assetTypeResult) {
            resolve(assetTypeResult);
          } else {
            reject('error getting the asset');
          }
        } else {
          reject('Id is not Valid');
        }
      } catch (error) {
        reject('Id is not Valid');
      }
    });
  }
}
