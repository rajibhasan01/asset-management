export class Asset {
  name?: string;
  description?: string;
  assetType?: string;
  private static asset: Asset;
  private constructor() {}
  /**
   * getInstance
   */
  public static getInstance() {
    if (!Asset.asset) {
      Asset.asset = new Asset();
    }
    return Asset.asset;
  }
}
