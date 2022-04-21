"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const adminDashboardRouter = express_1.default.Router();
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
module.exports = adminDashboardRouter;
//# sourceMappingURL=route.admin.dashboard.js.map