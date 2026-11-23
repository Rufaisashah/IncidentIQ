
import { Router } from "express";
import {
  createIncident,
  getAllIncidents,
  getIncidentById,
} from "../controllers/incidentController";

const router = Router();

router.post("/", createIncident);
router.get("/", getAllIncidents);
router.get("/:id", getIncidentById);

export default router;
