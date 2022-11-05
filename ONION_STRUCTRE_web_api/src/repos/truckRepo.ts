import {Service,Inject} from "typedi";

import {Document,FilterQuery,Model} from "mongoose";

import ITruckRepo from "../services/IRepos/ITruckRepo";
import {ITruckPersistence} from "../dataschema/ITruckPersistence";
import {TruckId} from "../domain/truckId";
import {Truck} from "../domain/truck";
import {TruckMap} from "../mappers/TruckMap";

@Service()
export default class TruckRepo implements ITruckRepo{

    private models: any;

    constructor(@Inject('truckSchema') private truckSchema: Model<ITruckPersistence & Document>) {}

    private createBaseQuery(): any {
        return{
            where: {},
        };
    }

    public async exists(truck: Truck): Promise<boolean>{

        // eslint-disable-next-line @typescript-eslint/no-angle-bracket-type-assertion
        const idX = truck.id instanceof TruckId ? (<TruckId>truck.id).id : truck.id;

        const query = {domainId: idX};
        const truckDocument = await this.truckSchema.findOne(query as FilterQuery<ITruckPersistence & Document>);

        return !!truckDocument === true;
    }

    public async save(truck: Truck): Promise<Truck>{

        const query = {domainId: truck.id.toString()};

        const truckDocument = await this.truckSchema.findOne(query);

        try{

            if(truckDocument === null){

                const rawUser: any = TruckMap.toPersistence(truck);

                const truckCreated = await this.truckSchema.create(rawUser);

                return TruckMap.toDomain(truckCreated);
            }else{
                truckDocument.id = truck.id.toString();
                truckDocument.tare= truck.tare;
                truckDocument.load_capacity= truck.load_capacity;
                truckDocument.maximum_battery_charge= truck.maximum_battery_charge;
                truckDocument.autonomy_when_fully_charged= truck.autonomy_when_fully_charged;
                truckDocument.fast_charging_time=truck.fast_charging_time;

                await truckDocument.save();

                return truck;
            }
        } catch (err){
            throw err;
        }
    }

    public async findByDomainId(truckId: TruckId | string): Promise<Truck>{
        const query = {domainId: truckId};
        const truckRecord = await this.truckSchema.findOne(query as FilterQuery<ITruckPersistence & Document>);

        if(truckRecord != null){
            return TruckMap.toDomain(truckRecord);
        }else return null;
    }

    public async deleteByUserId(userID: TruckId | string) {
        const query = { idUser: userID};
        await this.truckSchema.deleteMany(query as FilterQuery<ITruckPersistence & Document>);
    }

}
