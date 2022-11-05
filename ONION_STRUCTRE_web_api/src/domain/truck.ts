import { AggregateRoot } from '../core/domain/AggregateRoot';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

import { Result } from '../core/logic/Result';
import { TruckId } from "./truckId";

import ITruckDTO from "../dto/ITruckDTO";

interface TruckProps {
    tare: Number;
    load_capacity: Number;
    maximum_battery_charge: Number;
    autonomy_when_fully_charged: Number;
    fast_charging_time: Number;
}

export class Truck extends AggregateRoot<TruckProps> {

    get id(): UniqueEntityID{
        return this._id;
    }

    get truckId(): TruckId{
        return new TruckId(this.truckId.id);
    }
    get tare(): Number {
        return this.props.tare;
    }
    set tare(value: Number){
        this.props.tare=value;
    }
    get load_capacity(): Number {
        return this.props.load_capacity;
    }
    set load_capacity(value: Number){
        this.props.load_capacity=value;
    }
    get maximum_battery_charge(): Number {
        return this.props.maximum_battery_charge;
    }
    set maximum_battery_charge(value: Number){
        this.props.maximum_battery_charge=value;
    }
    get autonomy_when_fully_charged(): Number {
        return this.props.autonomy_when_fully_charged;
    }
    set autonomy_when_fully_charged(value: Number){
        this.props.autonomy_when_fully_charged=value;
    }
    get fast_charging_time(): Number {
        return this.props.fast_charging_time;
    }
    set fast_charging_time(value: Number){
        this.props.fast_charging_time=value;
    }


    private constructor(props: TruckProps, id?: UniqueEntityID) {
        super(props,id);
    }

    public static create(truckDTO: ITruckDTO, id?: UniqueEntityID): Result<Truck>{

        const truck = new Truck(
            {
                tare: truckDTO.tare,
                load_capacity: truckDTO.load_capacity,
                maximum_battery_charge: truckDTO.maximum_battery_charge,
                autonomy_when_fully_charged: truckDTO.autonomy_when_fully_charged,
                fast_charging_time: truckDTO.fast_charging_time
            }, id,);
        return Result.ok<Truck>(truck);
    }
}
