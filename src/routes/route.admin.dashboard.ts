import dotenv from "dotenv";
import express from 'express';
import passport from "passport";
import session from "express-session";
import invoiceRoute from './invoice/route.invoice';
import { AssetService } from './../services/asset/service.asset';
import { ProductService } from './../services/product/service.product';
import { AssetTypeService } from './../services/asset-type/service.asset-type';

dotenv.config()

const adminDashboardRouter = express.Router();
const assetService = AssetService.getInstance();
const productService = ProductService.getInstance();
const assetTypeService = AssetTypeService.getInstance();

adminDashboardRouter.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 43200000 }
}));

adminDashboardRouter.use(passport.session())

const checkAuth = (req:any,res:any,next:any) =>{
  if (req.isAuthenticated()) {

      next();
  } else {
      res.redirect('/login');
  }
}

adminDashboardRouter.get('/', checkAuth, (req, res, next) => {
  res.render('pages/index.ejs');
});


// Asset type route
adminDashboardRouter.get('/add-asset-type', (req, res, next) => {
  res.render('pages/add-asset-type.ejs');
});
adminDashboardRouter.get('/edit-asset-type/:id', async (req, res, next) => {
  const assetTypeId = req.params.id;
  const assetTypeResult = await assetTypeService.GetAssetTypeById(assetTypeId);
  res.render('pages/edit-asset-type.ejs', { assetTypeResult });
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
    } else {
      res.render('pages/add-asset-type.ejs', { message: result });
    }
  } catch (error) {
    console.log('Error in add asset type post route:', error);
  }
});
adminDashboardRouter.post('/edit-asset-type/:id', async (req, res, next) => {
  try {
    const assetTypeId = req.params.id;
    const assetTypeResult = await assetTypeService.EditAssetTypeById(
      assetTypeId,
      req.body
    );
    const assetTypeListResult = await assetTypeService.GetAssetTypeList();
    if (assetTypeResult && assetTypeListResult) {
      if (assetTypeResult === 'success') {
        res.render('pages/asset-type-list.ejs', {
          message: 'Successfully Edited',
          assetData: assetTypeListResult,
        });
      } else {
        res.render('pages/edit-asset-type.ejs', {
          message: 'Please Try Again.',
        });
      }
    } else {
      res.render('pages/edit-asset-type.ejs', { message: 'Please Try Again.' });
    }
  } catch (error) {
    console.log('Error in edit asset type post route:', error);
  }
});
adminDashboardRouter.get('/asset-type-list', async (req, res, next) => {
  const result = await assetTypeService.GetAssetTypeList();
  if (result) {
    res.render('pages/asset-type-list.ejs', { assetData: result });
  } else {
    res.render('pages/add-asset-type.ejs');
  }
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
adminDashboardRouter.get('/asset-list', async (req, res, next) => {
  try {
    const assets = await assetService.GetAssetList();
    if (assets) {
      res.render('pages/asset-list.ejs', { assets });
    } else {
      res.render('pages/asset-list.ejs');
    }
  } catch (error) {
    console.log('Error in getting asset list: ', error);
  }
});

adminDashboardRouter.get('/edit-asset/:id', async (req, res, next) => {
  const assetId = req.params.id;
  const assetResult = await assetService.GetAssetById(assetId);
  const assetType = await assetTypeService.GetAssetTypeList();
  res.render('pages/edit-asset.ejs', { assetResult, assetType });
});
adminDashboardRouter.post('/edit-asset/:id', async (req, res, next) => {
  try {
    const assetId = req.params.id;
    const assetResult = await assetService.EditAssetById(assetId, req.body);
    const assetListResult = await assetService.GetAssetList();
    if (assetResult) {
      if (assetResult === 'success') {
        res.render('pages/asset-list.ejs', {
          message: 'Successfully Edited',
          assetData: assetListResult,
        });
      } else {
        res.render('pages/edit-asset.ejs', {
          message: 'Please Try Again.',
        });
      }
    } else {
      res.render('pages/edit-asset.ejs', { message: 'Please Try Again.' });
    }
  } catch (error) {
    console.log('Error in edit asset type post route:', error);
  }
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

adminDashboardRouter.get('/edit-product/:id', async (req, res, next) => {
  const productId = req.params.id;
  const assetType = await assetService.GetAssetList();
  const productResult = await productService.GetProductById(productId);
  res.render('pages/edit-product.ejs', { productResult, assetType });
});
adminDashboardRouter.post('/edit-product/:id', async (req, res, next) => {
  try {
    const productId = req.params.id;
    const productResult = await productService.EditProductById(
      productId,
      req.body
    );
    const productsResult = await productService.GetProductList();
    if (productResult) {
      if (productResult === 'success') {
        res.render('pages/product-list.ejs', {
          message: 'Successfully Edited',
          products: productsResult,
        });
      } else {
        res.render('pages/edit-product.ejs', {
          message: 'Please Try Again.',
        });
      }
    } else {
      res.render('pages/edit-asset.ejs', { message: 'Please Try Again.' });
    }
  } catch (error) {
    console.log('Error in edit asset type post route:', error);
  }
});

adminDashboardRouter.use('/invoice', invoiceRoute);
export = adminDashboardRouter;
