import { IVehicle } from "../interfaces/IVehicle";
import { Request, Response } from "express";
import VehicleRepository from "../repositories/VehicleRepository";
import ResultModel from "../models/ResultModel";
import Dictionary from "../models/Dictionary";

abstract class VehicleController {
  public static async create(req: Request, res: Response) {
    try {
      const vehicle = await VehicleRepository.create(req.body as any);
      return res.status(200).json(new ResultModel(vehicle));
    } catch (e) {
      if (["DuplicateError"].includes((e as Error).name)) {
        return res
          .status(400)
          .json(
            new ResultModel(null, Dictionary.default((e as Error).message))
          );
      } else {
        return res
          .status(500)
          .json(
            new ResultModel(null, Dictionary.default((e as Error).message))
          );
      }
    }
  }

  public static async delete(req: Request, res: Response) {
    try {
      await VehicleRepository.delete(String(req.params.id));
      return res.status(200).json(new ResultModel(null));
    } catch (err) {
      if (["NotFountError"].includes((err as Error).name)) {
        return res
          .status(404)
          .json(
            new ResultModel(null, Dictionary.default((err as Error).message))
          );
      } else {
        return res
          .status(500)
          .json(
            new ResultModel(null, Dictionary.default((err as Error).message))
          );
      }
    }
  }

  public static async read(req: Request, res: Response) {
    try {
      const { limit } = req.query;

      const result = await VehicleRepository.read({ limit: Number(limit) });

      return res.status(200).json(new ResultModel(result));
    } catch (err) {
      return res
        .status(500)
        .json(
          new ResultModel(null, Dictionary.default((err as Error).message))
        );
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      await VehicleRepository.update(req.params.id, req.body as any);
      return res.status(200).json(new ResultModel(null));
    } catch (err) {
      if (["NotFountError"].includes((err as Error).name)) {
        return res
          .status(404)
          .json(
            new ResultModel(null, Dictionary.default((err as Error).message))
          );
      } else if (["DuplicateError"].includes((err as Error).name)) {
        return res
          .status(400)
          .json(
            new ResultModel(null, Dictionary.default((err as Error).message))
          );
      } else {
        return res
          .status(500)
          .json(
            new ResultModel(null, Dictionary.default((err as Error).message))
          );
      }
    }
  }
}

export default VehicleController;
