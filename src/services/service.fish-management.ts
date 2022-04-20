import { FishManagementInterface } from "../interfaces/interface.fish-management";

export class FishManagementService implements FishManagementInterface{

    private static instance : FishManagementService;
    private constructor(){}

    static getInstance(){
        if( !FishManagementService.instance ){
            FishManagementService.instance = new FishManagementService();
        }
        return FishManagementService.instance;
    }

    addFish() {
        throw new Error("Method not implemented.");
    }



}