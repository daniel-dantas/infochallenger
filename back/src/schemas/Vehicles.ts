import PgConnection from "../connections/PgConnection";
import { DataTypes, Model } from "sequelize";
import { IVehicle } from "../interfaces/IVehicle";
import PG from "../connections/PgConnection";

interface VehicleModel extends Model, IVehicle{
  id: string;
}

const Vehicle = PG.define<VehicleModel>("Vehicle", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  board: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  chassi: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  reindeer: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Vehicle;
