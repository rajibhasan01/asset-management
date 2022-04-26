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
adminDashboardRouter.get('/add-asset-type', (req, res, next) => {
  res.render('pages/add-asset-type.ejs');
});
adminDashboardRouter.post('/add-asset-type', async (req, res, next) => {
  try {
    const result = assetTypeService.AddAssetType(req.body);
    if (result) {
      // res.status(200).json({ msg: result });
      console.log(result);
    } else {
      // res.status(400).json({ msg: result });
      console.log(result);
    }
  } catch (error) {
    console.log('Error in add asset type post route:', error);
  }
  res.render('pages/asset-type-list.ejs');
});
adminDashboardRouter.get('/asset-type-list', (req, res, next) => {
  res.render('pages/asset-type-list.ejs');
});
adminDashboardRouter.get('/add-asset', (req, res, next) => {
  res.render('pages/add-asset.ejs');
});
adminDashboardRouter.post('/add-asset', async (req, res, next) => {
  try {
    const result = assetService.AddAsset(req.body);
    if (result) {
      res.status(200).json({ msg: result });
    } else {
      res.status(400).json({ msg: result });
    }
  } catch (error) {
    console.log('Error in add asset post route:', error);
  }
  res.render('pages/asset-list.ejs');
});
adminDashboardRouter.get('/asset-list', (req, res, next) => {
  res.render('pages/asset-list.ejs');
});
adminDashboardRouter.get('/add-product', (req, res, next) => {
  res.render('pages/add-product.ejs');
});
adminDashboardRouter.post('/add-product', async (req, res, next) => {
  try {
    const result = productService.AddProduct(req.body);
    if (result) {
      res.status(200).json({ msg: result });
    } else {
      res.status(400).json({ msg: result });
    }
  } catch (error) {
    console.log('Error in add product post route:', error);
  }
  res.render('pages/asset-list.ejs');
});
adminDashboardRouter.get('/product-list', (req, res, next) => {
  res.render('pages/product-list.ejs');
});

export = adminDashboardRouter;
