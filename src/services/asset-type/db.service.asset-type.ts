import { MongoClient, ObjectId } from 'mongodb';
import { ConfigService } from './../utility/configService';
import { AssetType } from './../../models/model.asset-type';

const config = ConfigService.getInstance().getConfig();

export class DbAssetType {
  private static dbAssetType: DbAssetType;
  private collectionName: string;
  private constructor() {
    this.collectionName = 'assetType';
  }
  public static getInstance() {
    if (!DbAssetType.dbAssetType) {
      DbAssetType.dbAssetType = new DbAssetType();
    }
    return DbAssetType.dbAssetType;
  }
  private async getDbConnection() {
    try {
      const dbConnection = await new MongoClient(config.mongo.url).connect();
      return dbConnection;
    } catch (error) {
      console.log('Error in getDbConnection method of DbAssetType');
    }
  }

  public async CreateAssetType(assetType: AssetType) {
    return new Promise(async (resolve, reject) => {
      try {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        const result = await dbCollection.insertOne(assetType);
        await dbConn.close();
        if (result) {
          resolve('success');
        } else {
          reject('failed');
        }
      } catch (error) {
        console.log('Error in CreateAssetType method of DbAssetType: ', error);
      }
    });
  }
  public async EditAssetTypeById(assetTypeId: string, assetType: AssetType) {
    return new Promise(async (resolve, reject) => {
      try {
        const dbConn = await this.getDbConnection();
        const db = dbConn.db(config.mongo.dbName);
        const dbCollection = db.collection(this.collectionName);
        const result = await dbCollection.updateOne(
          { _id: new ObjectId(assetTypeId) },
          {
            $set: {
              name: assetType.name,
              description: assetType.description,
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
        console.log(
          'Error in EditAssetTypeById method of DbAssetType: ',
          error
        );
      }
    });
  }
  /**
   * GetAssetTypeList
   */
  public GetAssetTypeList() {
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
  /**
   * GetAssetTypeById
   */
  public GetAssetTypeById(assetTypeId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        if (ObjectId.isValid(assetTypeId)) {
          const dbConn = await this.getDbConnection();
          const db = dbConn.db(config.mongo.dbName);
          const dbCollection = db.collection(this.collectionName);
          const assetTypeResult = await dbCollection.findOne({
            _id: new ObjectId(assetTypeId),
          });
          if (assetTypeResult) {
            resolve(assetTypeResult);
          } else {
            reject('error getting the asset type');
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
