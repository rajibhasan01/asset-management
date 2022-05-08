import { DbAssetType } from './db.service.asset-type';
import { AssetType } from './../../models/model.asset-type';
import { AssetTypeInterFace } from './../../interfaces/interface.asset-type';
const dbAssetType = DbAssetType.getInstance();
export class AssetTypeService implements AssetTypeInterFace {
  public static assetTypeService: AssetTypeService;
  private constructor() {}

  /**
   * static getInstance
   */
  public static getInstance() {
    if (!AssetTypeService.assetTypeService) {
      AssetTypeService.assetTypeService = new AssetTypeService();
    }
    return AssetTypeService.assetTypeService;
  }
  public AddAssetType(assetType: AssetType) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await dbAssetType.CreateAssetType(assetType);
        if (result === 'success') {
          resolve('Asset Type is Added Successfully');
        } else {
          resolve('Failed to Add Asset Type');
        }
      } catch (error) {
        console.log('Error in AddAssetType Method of AssetTypeService:', error);
      }
      // console.log(assetType);
      // resolve(assetType);
    });
  }
  public EditAssetType(assetType: AssetType) {
    throw new Error('Method not implemented.');
  }
  public GetAssetTypeList() {
    return new Promise(async (resolve, reject) => {
      await dbAssetType
        .GetAssetTypeList()
        .then((result) => {
          resolve(result);
        })
        .catch((err) => reject(err));
    });
  }
  public GetAssetTypeById(assetTypeId: string) {
    return new Promise(async (resolve, reject) => {
      await dbAssetType
        .GetAssetTypeById(assetTypeId)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => reject(err));
    });
  }
  public EditAssetTypeById(assetTypeId: string, assetType: AssetType) {
    return new Promise(async (resolve, reject) => {
      await dbAssetType
        .EditAssetTypeById(assetTypeId, assetType)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => reject(err));
    });
  }
}
