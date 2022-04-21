"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const route_admin_dashboard_1 = __importDefault(require("./route.admin.dashboard"));
const registeredRouters = express_1.default.Router();
registeredRouters.use("/", route_admin_dashboard_1.default);
module.exports = registeredRouters;
//# sourceMappingURL=register-routing-files.js.map