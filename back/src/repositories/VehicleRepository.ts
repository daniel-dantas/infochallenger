import VehicleModel from "../schemas/Vehicles";
import { IVehicle } from "../interfaces/IVehicle";
import { DuplicateError, NotFountError } from "../errors";
import { Op } from "sequelize";
import { v4 as uuidv4 } from "uuid";

interface FilterRead {
    limit?: number,
    page?: number
}

abstract class VehicleRepository {
    public static async create (vehicleData: IVehicle) {
        const vehicleExist = await VehicleModel.findOne({
            where: { 
                [Op.or]: {
                    board: vehicleData.board,
                    chassi: vehicleData.chassi,
                    reindeer: vehicleData.reindeer,
                } 
            }
        });

        if(vehicleExist) {
            throw new DuplicateError("This vehicle is already registered in the database");
        } else {
            const id = uuidv4();

            const vehicle = await VehicleModel.create({
                id,
                ...vehicleData
            });

            return vehicle;
        }

    }

    public static async delete(id: string) {
        const vehicle = await VehicleModel.findOne({ where: { id } });

        if(!vehicle) {
            throw new NotFountError("The vehicle was not found in the database");
        } else {
            await VehicleModel.destroy({
                where: {
                    id
                }
            });
        }
    }

    public static async read(filter?: FilterRead) {
        const vehicles = await VehicleModel.findAll({
            limit: 100 ?? filter?.limit,
            // offset: filter?.page ?? (5 * page)
        });
        return vehicles;
    }

    public static async update(id: string, newVehicle: IVehicle) {
        const vehicleExist = await VehicleModel.findOne({ where: { id } });

        if(!vehicleExist) {
            throw new NotFountError("The vehicle was not found in the database");
        } else {

            const vehicleExistData = await VehicleModel.findOne({
                where: {
                    [Op.or]: {
                        board: newVehicle.board,
                        chassi: newVehicle.chassi,
                        reindeer: newVehicle.reindeer,
                    } 
                }
            });

            if(vehicleExistData) {
                throw new DuplicateError("This vehicle is already registered in the database");
            } else {
                const newVehicleResult = await VehicleModel.update(newVehicle, {
                    where: {
                        id
                    }
                });

                return newVehicleResult;
            }
        }
    }

}

export default VehicleRepository;