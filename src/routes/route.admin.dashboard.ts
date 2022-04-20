import express from "express";
const adminDashboardRouter = express.Router();

adminDashboardRouter.get("/", (req, res, next)=>{
    res.render('index');
});



export = adminDashboardRouter;