"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PondManagementService = void 0;
const service_fish_management_1 = require("./service.fish-management");
class PondManagementService {
    constructor() {
    }
    addPond(pondName) {
        // tslint:disable-next-line:no-console
        console.log(pondName);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Pond " + pondName + " Added Successfully");
            }, 3000);
        });
    }
    getFishStatus() {
        const fishManagementService = service_fish_management_1.FishManagementService.getInstance();
    }
    static getInstance() {
        if (!PondManagementService.instance) {
            PondManagementService.instance = new PondManagementService();
        }
        return PondManagementService.instance;
    }
}
exports.PondManagementService = PondManagementService;
//# sourceMappingURL=service.pond-management.js.map