import { Mapper } from '../core/infra/Mapper';

import { Document, Model } from 'mongoose';

import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Path } from '../domain/path';
import IPathDTO from '../dto/IPathDTO';
import {IPathPersistence} from "../dataschema/IPathPersistence";


export class PathMap extends Mapper<Path> {
    public static toDTO(path: Path): IPathDTO {
    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
        return {
            id: path.id.toString(),
            departure_warehouse: path.departure_warehouse,
            arrival_warehouse: path.arrival_warehouse,
            distance: path.distance,
            time: path.time,
            energy_used: path.energy_used,
            extra_time: path.extra_time,
        } as  IPathDTO;
        } 
    

    public static toDomain(path: any | Model<IPathPersistence & Document>): Path {
        const pathOrError = Path.create(path, new UniqueEntityID(path.domainId));

        pathOrError.isFailure ? console.log(pathOrError.error) : '';

        return pathOrError.isSuccess ? pathOrError.getValue() : null;
    }

    public static toPersistence(path: Path): any {
        return {
            domainId: path.id.toString(),
            departure_warehouse: path.departure_warehouse,
            arrival_warehouse: path.arrival_warehouse,
            distance: path.distance,
            time: path.time,
            energy_used: path.energy_used,
            extra_time: path.extra_time,
        };
    }
}
