import { PondManagementInterface } from "../interfaces/interface.pond-management";
import { FishManagementService } from "./service.fish-management";

export class PondManagementService implements PondManagementInterface{
    private static instance: PondManagementService;
    private constructor(){
    }

    addPond(pondName : string) {
        // tslint:disable-next-line:no-console
        console.log(pondName);
        return new Promise( (resolve, reject) =>{
            setTimeout(()=>{
                resolve("Pond "+ pondName +" Added Successfully");
            }, 3000);

        });
    }

    getFishStatus(){
        const fishManagementService = FishManagementService.getInstance();
    }

    static getInstance(){
        if(!PondManagementService.instance){
            PondManagementService.instance = new PondManagementService();
        }
        return PondManagementService.instance;
    }





}