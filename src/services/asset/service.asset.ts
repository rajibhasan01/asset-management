import { DbAsset } from './db.service.asset';
import { Asset } from './../../models/model.asset';
import { AssetInterface } from './../../interfaces/interface.asset';
const dbAsset = DbAsset.getInstance();
export class AssetService implements AssetInterface {
  private static assetService: AssetService;
  private constructor() {}

  public AddAsset(assetData: Asset) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await dbAsset.CreateAsset(assetData);
        if (result === 'success') {
          resolve('Asset is Added Successfully');
        } else {
          resolve('Failed to Add Asset');
        }
      } catch (error) {
        console.log('Error in AddAsset Method of AssetService:', error);
      }
    });
  }
  public EditAsset(assetData: Asset) {
    throw new Error('Method not implemented.');
  }
  /**
   * static getInstance
   */
  public static getInstance() {
    if (!AssetService.assetService) {
      AssetService.assetService = new AssetService();
    }
    return AssetService.assetService;
  }
  public GetAssetList() {
    return new Promise(async (resolve, reject) => {
      await dbAsset
        .GetAssetList()
        .then((result) => {
          resolve(result);
        })
        .catch((err) => reject(err));
    });
  }
  public GetAssetById(assetId: string) {
    return new Promise(async (resolve, reject) => {
      await dbAsset
        .GetAssetById(assetId)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => reject(err));
    });
  }
  public EditAssetById(assetId: string, asset: Asset) {
    return new Promise(async (resolve, reject) => {
      await dbAsset
        .EditAssetById(assetId, asset)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => reject(err));
    });
  }
}
