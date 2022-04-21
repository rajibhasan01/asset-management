import express from 'express';
const adminDashboardRouter = express.Router();

adminDashboardRouter.get('/', (req, res, next) => {
  res.render('../views/pages/index.ejs');
});
adminDashboardRouter.get('/add-asset-type', (req, res, next) => {
  res.render('../views/pages/add-asset-type.ejs');
});
adminDashboardRouter.get('/add-asset', (req, res, next) => {
  res.render('../views/pages/add-asset.ejs');
});
adminDashboardRouter.get('/add-product', (req, res, next) => {
  res.render('../views/pages/add-product.ejs');
});

export = adminDashboardRouter;
