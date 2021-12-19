import PgConnection from "../connections/PgConnection";
import { DataTypes, Model } from "sequelize";
import { IVehicle } from "../interfaces/IVehicle";

class Vehicle extends Model<IVehicle> implements IVehicle {
  public id!: string;
  public board!: string;
  public chassi!: string;
  public reindeer!: string;
  public model!: string;
  public brand!: string;
  public year!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Vehicle.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    board: {
        type: DataTypes.STRING,
        unique: true,
    },
    chassi: {
        type: DataTypes.STRING,
        unique: true,
    },
    reindeer: {
        type: DataTypes.STRING,
        unique: true,
    },
    model: {
        type: DataTypes.STRING,
    },
    brand: {
        type: DataTypes.STRING,
    },
    year: {
        type: DataTypes.NUMBER
    },
  },
  {
    sequelize: PgConnection.getDatabase(),
    freezeTableName: true,
  }
);

export default Vehicle;
