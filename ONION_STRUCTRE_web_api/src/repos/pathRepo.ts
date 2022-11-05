import { Service, Inject } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';

import IPathRepo from '../services/IRepos/IPathRepo';
import { IPathPersistence } from '../dataschema/IPathPersistence';
import { PathId } from '../domain/pathId';
import { Path } from '../domain/path';
import { PathMap } from '../mappers/PathMap';

@Service()
export default class PathRepo implements IPathRepo{

    private models: any;

    constructor(@Inject('pathSchema') private pathSchema: Model<IPathPersistence & Document>) {}

    private createBaseQuery(): any {
        return{
            where: {},
        };
    }

    public async exists(path: Path): Promise<boolean>{

        // eslint-disable-next-line @typescript-eslint/no-angle-bracket-type-assertion
        const idX = path.id instanceof PathId ? (<PathId>path.id).id : path.id;

        const query = {domainId: idX};
        const pathDocument = await this.pathSchema.findOne(query as FilterQuery<IPathPersistence & Document>);

        return !!pathDocument === true;
    }

    public async save(path: Path): Promise<Path>{

        const query = {domainId: path.id.toString()};

        const pathDocument = await this.pathSchema.findOne(query);

        try{

            if(pathDocument === null){

                const rawUser: any = PathMap.toPersistence(path);

                const pathCreated = await this.pathSchema.create(rawUser);

                return PathMap.toDomain(pathCreated);
            }else{
                pathDocument.id = path.id.toString();
                pathDocument.departure_warehouse= path.departure_warehouse;
                pathDocument.arrival_warehouse= path.arrival_warehouse;
                pathDocument.distance= path.distance;
                pathDocument.time= path.time;
                pathDocument.energy_used= path.energy_used;
                pathDocument.extra_time=path.extra_time;

                await pathDocument.save();

                return path;
            }
        } catch (err){
            throw err;
        }
    }

    public async findByDomainId(pathId: PathId | string): Promise<Path>{
        const query = {domainId: pathId};
        const pathRecord = await this.pathSchema.findOne(query as FilterQuery<IPathPersistence & Document>);

        if(pathRecord != null){
            return PathMap.toDomain(pathRecord);
        }else return null;
    }

    public async deleteByUserId(userID: PathId | string) {
        const query = { idUser: userID};
        await this.pathSchema.deleteMany(query as FilterQuery<IPathPersistence & Document>);
    }

}
