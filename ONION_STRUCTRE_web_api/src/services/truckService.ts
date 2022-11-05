import {Service,Inject} from "typedi";
import config from "../../config";
import ITruckDTO from "../dto/ITruckDTO";
import { Truck} from "../domain/truck";
import ITruckRepo from "./IRepos/ITruckRepo";
import {Result} from "../core/logic/Result";
import {TruckMap} from "../mappers/TruckMap";
import ITruckService from "./IServices/ITruckService";

@Service()
export default class TruckService implements ITruckService {
  constructor(
      @Inject(config.repos.truck.name) private truckRepo : ITruckRepo
  ) {}

  public async getTruck( truckId: string): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findByDomainId(truckId);

      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck not found");
      }
      else {
        const truckDTOResult = TruckMap.toDTO( truck ) as ITruckDTO;
        return Result.ok<ITruckDTO>( truckDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }


  public async createTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {

      const truckOrError = await Truck.create( truckDTO );

      if (truckOrError.isFailure) {
        return Result.fail<ITruckDTO>(truckOrError.errorValue());
      }

      const truckResult = truckOrError.getValue();

      await this.truckRepo.save(truckResult);

      const truckDTOResult = TruckMap.toDTO( truckResult ) as ITruckDTO;
      return Result.ok<ITruckDTO>( truckDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findByDomainId(truckDTO.id);

      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck not found");
      }
      else {
        truck.tare = truckDTO.tare;
        truck.load_capacity = truckDTO.load_capacity;
        truck.maximum_battery_charge = truckDTO.maximum_battery_charge;
        truck.autonomy_when_fully_charged = truckDTO.autonomy_when_fully_charged;
        truck.fast_charging_time = truckDTO.fast_charging_time;
        await this.truckRepo.save(truck);

        const truckDTOResult = TruckMap.toDTO( truck ) as ITruckDTO;
        return Result.ok<ITruckDTO>( truckDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

}



