import { Asset } from './../models/model.asset';
export interface AssetInterface {
  AddAsset(assetData: Asset): any;
  EditAsset(assetData: Asset): any;
  GetAssetList(): any;
  GetAssetById(assetTypeId: string): any;
  EditAssetById(assetId: string, asset: Asset): any;
}
