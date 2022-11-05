import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { PathId } from "./pathId";

import IPathDTO from "../dto/IPathDTO";


interface PathProps {
    departure_warehouse: string;
    arrival_warehouse: string;
    distance: Number;
    time: Number;
    energy_used: Number;
    extra_time: Number;
}

export class Path extends AggregateRoot<PathProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get pathId(): PathId {
        return new PathId(this.pathId.id);
    }

    get departure_warehouse(): string {
        return this.props.departure_warehouse;
    }
    set departure_warehouse(value: string){
        this.props.departure_warehouse=value;
    }
    get arrival_warehouse(): string {
        return this.props.arrival_warehouse;
    }
    set arrival_warehouse(value: string){
        this.props.arrival_warehouse=value;
    }
    get distance(): Number {
        return this.props.distance;
    }
    set distance(value: Number){
        this.props.distance=value;
    }
    get time(): Number {
        return this.props.time;
    }
    set time(value: Number){
        this.props.time=value;
    }
    get energy_used(): Number {
        return this.props.energy_used;
    }
    set energy_used(value: Number){
        this.props.energy_used=value;
    }
    get extra_time(): Number {
        return this.props.extra_time;
    }
    set extra_time(value: Number){
        this.props.extra_time=value;
    }

    private constructor(props: PathProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(pathDTO: IPathDTO, id?: UniqueEntityID): Result<Path>{

        const path = new Path(
            {
                departure_warehouse: pathDTO.departure_warehouse,
                arrival_warehouse: pathDTO.arrival_warehouse,
                distance: pathDTO.distance,
                time: pathDTO.time,
                energy_used: pathDTO.energy_used,
                extra_time: pathDTO.extra_time
            }, id,);
        return Result.ok<Path>(path);
    }
}
