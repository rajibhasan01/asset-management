import { AssetType } from './../models/model.asset-type';
export interface AssetTypeInterFace {
  AddAssetType(assetType: AssetType): any;
  EditAssetType(assetType: AssetType): any;
  GetAssetTypeList(): any;
}
