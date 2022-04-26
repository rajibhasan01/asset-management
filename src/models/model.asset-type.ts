export class AssetType {
  name?: string;
  description?: string;
  private static assetType: AssetType;
  private constructor() {}
  /**
   * getInstance
   */
  public static getInstance() {
    if (!AssetType.assetType) {
      AssetType.assetType = new AssetType();
    }
    return AssetType.assetType;
  }
}
