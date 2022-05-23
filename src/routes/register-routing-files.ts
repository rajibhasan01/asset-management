import express from "express";
import adminDashboardRouter from "./route.admin.dashboard";
import {loginRoute} from "./login/route.login";

const registeredRouters = express.Router();

registeredRouters.use("/", adminDashboardRouter);
registeredRouters.use("/login/", loginRoute);


export = registeredRouters ;


