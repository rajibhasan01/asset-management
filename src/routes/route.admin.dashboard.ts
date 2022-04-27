import { ProductService } from './../services/product/service.product';
import { AssetService } from './../services/asset/service.asset';
import { AssetTypeService } from './../services/asset-type/service.asset-type';

import express from 'express';
const adminDashboardRouter = express.Router();
const assetTypeService = AssetTypeService.getInstance();
const assetService = AssetService.getInstance();
const productService = ProductService.getInstance();

adminDashboardRouter.get('/', (req, res, next) => {
  res.render('pages/index.ejs');
});

// Asset type route
adminDashboardRouter.get('/add-asset-type', (req, res, next) => {
  res.render('pages/add-asset-type.ejs');
});
adminDashboardRouter.post('/add-asset-type', async (req, res, next) => {
  try {
    const result = await assetTypeService.AddAssetType(req.body);
    const assetType = await assetTypeService.GetAssetTypeList();
    if (result && assetType) {
      res.render('pages/asset-type-list.ejs', {
        message: result,
        assetData: assetType,
      });
      console.log(result);
    } else {
      res.render('pages/add-asset-type.ejs', { message: result });
      console.log(result);
    }
  } catch (error) {
    console.log('Error in add asset type post route:', error);
  }
});
adminDashboardRouter.get('/asset-type-list', async (req, res, next) => {
  const result = await assetTypeService.GetAssetTypeList();
  if (result) {
    res.render('pages/asset-type-list.ejs', { assetData: result });
  } else {
    res.render('pages/add-asset-type.ejs', { assetData: result });
  }
  // res.render('pages/asset-type-list.ejs');
});

// Asset route
adminDashboardRouter.get('/add-asset', async (req, res, next) => {
  const result = await assetTypeService.GetAssetTypeList();
  if (result) {
    res.render('pages/add-asset.ejs', { assetType: result });
  } else {
    res.render('pages/add-asset.ejs');
  }
});
adminDashboardRouter.post('/add-asset', async (req, res, next) => {
  try {
    const result = await assetService.AddAsset(req.body);
    const assets = await assetService.GetAssetList();
    if (result && assets) {
      res.render('pages/asset-list.ejs', {
        message: result,
        assets,
      });
    } else {
      res.render('pages/add-asset.ejs', { message: result });
    }
  } catch (error) {
    console.log('Error in add asset post route:', error);
  }
});
adminDashboardRouter.get('/asset-list', (req, res, next) => {
  res.render('pages/asset-list.ejs');
});

// Product route
adminDashboardRouter.get('/add-product', async (req, res, next) => {
  const assets = await assetService.GetAssetList();
  if (assets) {
    res.render('pages/add-product.ejs', { assets });
  } else {
    res.render('pages/add-product.ejs');
  }
});
adminDashboardRouter.post('/add-product', async (req, res, next) => {
  try {
    const result = await productService.AddProduct(req.body);
    const products = await productService.GetProductList();
    if (result && products) {
      res.render('pages/product-list.ejs', { message: result, products });
    } else {
      res.render('pages/add-product.ejs', { message: result });
    }
  } catch (error) {
    console.log('Error in add product post route:', error);
  }
});
adminDashboardRouter.get('/product-list', async (req, res, next) => {
  const products = await productService.GetProductList();
  if (products) {
    res.render('pages/product-list.ejs', { products });
  } else {
    res.render('pages/product-list.ejs');
  }
});

export = adminDashboardRouter;
