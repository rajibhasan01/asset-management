"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FishManagementService = void 0;
class FishManagementService {
    constructor() { }
    static getInstance() {
        if (!FishManagementService.instance) {
            FishManagementService.instance = new FishManagementService();
        }
        return FishManagementService.instance;
    }
    addFish() {
        throw new Error("Method not implemented.");
    }
}
exports.FishManagementService = FishManagementService;
//# sourceMappingURL=service.fish-management.js.map