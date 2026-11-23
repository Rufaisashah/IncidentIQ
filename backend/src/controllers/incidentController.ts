
import type { Request, Response } from "express";
import { z } from "zod";
import * as incidentService from "../services/incidentService";

const incidentSchema = z.object({
  title: z.string().trim().min(1).max(200),
  application_name: z.string().trim().min(1).max(150),
  platform: z.enum(["Azure", "Render", "Netlify", "Other"]),
  environment: z.enum([
    "development", "staging", "production"
  ]).default("development"),
  description: z.string().max(10000).optional(),
  severity: z.enum([
    "low", "medium", "high", "critical"
  ]).default("medium"),
}).strict();

export async function createIncident(
  req: Request,
  res: Response
) {
  const parsed = incidentSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid incident data",
        details: z.flattenError(parsed.error)
      }
    });
  }

  try {
    const incident = await incidentService.createIncident(
      parsed.data
    );

    return res.status(201).json(incident);
  } catch (error) {
    console.error("Create incident error:", error);
    return res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "Unable to create incident"
      }
    });
  }
}

export async function getAllIncidents(
  _req: Request,
  res: Response
) {
  try {
    const incidents = await incidentService.getAllIncidents();
    return res.status(200).json({ items: incidents });
  } catch (error) {
    console.error("Get incidents error:", error);
    return res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "Unable to retrieve incidents"
      }
    });
  }
}

export async function getIncidentById(
  req: Request,
  res: Response
) {
  const parsed = z.uuid().safeParse(req.params.id);

  if (!parsed.success) {
    return res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid incident ID"
      }
    });
  }

  try {
    const incident = await incidentService.getIncidentById(
      parsed.data
    );

    if (!incident) {
      return res.status(404).json({
        error: {
          code: "NOT_FOUND",
          message: "Incident not found"
        }
      });
    }

    return res.status(200).json(incident);
  } catch (error) {
    console.error("Get incident error:", error);
    return res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "Unable to retrieve incident"
      }
    });
  }
}
