export interface ITruckPersistence{
    domainId: string;
    tare: Number;
    load_capacity: Number;
    maximum_battery_charge: Number;
    autonomy_when_fully_charged: Number;
    fast_charging_time: Number;
}
