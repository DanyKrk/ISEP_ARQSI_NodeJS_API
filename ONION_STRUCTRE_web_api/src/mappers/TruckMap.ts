import {Mapper} from '../core/infra/Mapper';

import {Document, Model} from "mongoose";

import {UniqueEntityID} from "../core/domain/UniqueEntityID";
import {Truck} from "../domain/truck";
import ITruckDTO from "../dto/ITruckDTO";
import {ITruckPersistence} from "../dataschema/ITruckPersistence";

export class TruckMap extends Mapper<Truck>
{
    public static toDTO(truck: Truck): ITruckDTO{
        // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
        return {
            id: truck.id.toString(),
            tare: truck.tare,
            load_capacity: truck.load_capacity,
            maximum_battery_charge: truck.maximum_battery_charge,
            autonomy_when_fully_charged: truck.autonomy_when_fully_charged,
            fast_charging_time: truck.fast_charging_time,
        } as ITruckDTO;
    }

    public static toDomain(truck: any | Model<ITruckPersistence & Document>): Truck {

        const truckOrError = Truck.create(truck,new UniqueEntityID(truck.domainId));

        truckOrError.isFailure ? console.log(truckOrError.error) : '';

        return truckOrError.isSuccess ? truckOrError.getValue() : null;
    }

    public static toPersistence(truck: Truck): any{
        return {
            domainId: truck.id.toString(),
            tare: truck.tare,
            load_capacity: truck.load_capacity,
            maximum_battery_charge: truck.maximum_battery_charge,
            autonomy_when_fully_charged: truck.autonomy_when_fully_charged,
            fast_charging_time: truck.fast_charging_time,
        };
    }

}
