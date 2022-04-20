import express from "express";
import adminDashboardRouter from "./route.admin.dashboard";

const registeredRouters = express.Router();

registeredRouters.use("/", adminDashboardRouter);


export = registeredRouters ;


