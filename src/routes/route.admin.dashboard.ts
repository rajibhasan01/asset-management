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

adminDashboardRouter.use(passport.session());

// Middle ware for no caching.
// So, after logout we can prevent the browser's back button from accessing restricted information, after the user has logged out?
adminDashboardRouter.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next()
});

const checkAuth = (req:any,res:any,next:any) =>{
  if (req.isAuthenticated()) {

      next();
  } else {
      res.redirect('/login');
  }
}


// DashBoard API
adminDashboardRouter.get('/', checkAuth, (req, res, next) => {
  res.render('pages/index.ejs');
});


// Add Asset Type Get API
adminDashboardRouter.get('/add-asset-type', checkAuth, (req, res, next) => {
  res.render('pages/add-asset-type.ejs');
});

// Edit Asset Type Get API
adminDashboardRouter.get('/edit-asset-type/:id', checkAuth, async (req, res, next) => {
  const assetTypeId = req.params.id;
  const assetTypeResult = await assetTypeService.GetAssetTypeById(assetTypeId);
  res.render('pages/edit-asset-type.ejs', { assetTypeResult });
});

// Add Asset Type Post API
adminDashboardRouter.post('/add-asset-type', checkAuth, async (req, res, next) => {
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

// Edit Asset Type Post API
adminDashboardRouter.post('/edit-asset-type/:id', checkAuth, async (req, res, next) => {
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

// Asset Type List Get API
adminDashboardRouter.get('/asset-type-list', checkAuth, async (req, res, next) => {
  const result = await assetTypeService.GetAssetTypeList();
  if (result) {
    res.render('pages/asset-type-list.ejs', { assetData: result });
  } else {
    res.render('pages/add-asset-type.ejs');
  }
});

// Add Asset Get API
adminDashboardRouter.get('/add-asset', checkAuth, async (req, res, next) => {
  const result = await assetTypeService.GetAssetTypeList();
  if (result) {
    res.render('pages/add-asset.ejs', { assetType: result });
  } else {
    res.render('pages/add-asset.ejs');
  }
});

// Add Asset Post API
adminDashboardRouter.post('/add-asset', checkAuth, async (req, res, next) => {
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

// Asset List Get API
adminDashboardRouter.get('/asset-list', checkAuth, async (req, res, next) => {
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

// Edit Asset Get API
adminDashboardRouter.get('/edit-asset/:id', checkAuth, async (req, res, next) => {
  const assetId = req.params.id;
  const assetResult = await assetService.GetAssetById(assetId);
  const assetType = await assetTypeService.GetAssetTypeList();
  res.render('pages/edit-asset.ejs', { assetResult, assetType });
});

// Edit Asset Post API
adminDashboardRouter.post('/edit-asset/:id', checkAuth, async (req, res, next) => {
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

// Add Product Get API
adminDashboardRouter.get('/add-product', checkAuth, async (req, res, next) => {
  const assets = await assetService.GetAssetList();
  if (assets) {
    res.render('pages/add-product.ejs', { assets });
  } else {
    res.render('pages/add-product.ejs');
  }
});

// Add Product Post API
adminDashboardRouter.post('/add-product', checkAuth, async (req, res, next) => {
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

// Product List Get API
adminDashboardRouter.get('/product-list', checkAuth, async (req, res, next) => {
  const products = await productService.GetProductList();
  if (products) {
    res.render('pages/product-list.ejs', { products });
  } else {
    res.render('pages/product-list.ejs');
  }
});

// Edit Product Get API
adminDashboardRouter.get('/edit-product/:id', checkAuth, async (req, res, next) => {
  const productId = req.params.id;
  const assetType = await assetService.GetAssetList();
  const productResult = await productService.GetProductById(productId);
  res.render('pages/edit-product.ejs', { productResult, assetType });
});

// Edit Product Post API
adminDashboardRouter.post('/edit-product/:id', checkAuth, async (req, res, next) => {
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


// Session Logout
adminDashboardRouter.get("/logout", checkAuth, (req:any, res:any, next:any) => {
  req.logout(req.user, (err:any) => {
    if(err) return next(err);
    res.redirect("/login");
  });
});

adminDashboardRouter.use('/invoice', checkAuth, invoiceRoute);
export = adminDashboardRouter;
