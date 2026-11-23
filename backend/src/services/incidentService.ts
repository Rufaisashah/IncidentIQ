
import { pool } from "../config/db";

export type NewIncident = {
  title: string;
  application_name: string;
  platform: "Azure" | "Render" | "Netlify" | "Other";
  environment: "development" | "staging" | "production";
  description?: string | null;
  severity: "low" | "medium" | "high" | "critical";
};

export async function createIncident(data: NewIncident) {
  const result = await pool.query(
    `INSERT INTO incidents
     (title, application_name, platform,
      environment, description, severity)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      data.title,
      data.application_name,
      data.platform,
      data.environment,
      data.description ?? null,
      data.severity,
    ]
  );

  return result.rows[0];
}

export async function getAllIncidents() {
  const result = await pool.query(
    "SELECT * FROM incidents ORDER BY created_at DESC"
  );

  return result.rows;
}

export async function getIncidentById(id: string) {
  const result = await pool.query(
    "SELECT * FROM incidents WHERE id = $1",
    [id]
  );

  return result.rows[0] ?? null;
}
