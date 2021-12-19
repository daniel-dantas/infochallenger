import { Router } from "express";
import VehicleController from "../controllers/VehicleController";

const router = Router();

router.post("/vehicle", VehicleController.create);
router.delete("/vehicle/:id", VehicleController.delete);
router.get("/vehicle", VehicleController.read);
router.put("/vehicle/:id", VehicleController.update);

export default router;
