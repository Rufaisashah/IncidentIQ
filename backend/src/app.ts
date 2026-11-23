
import express from "express";
import cors from "cors";
import healthRoutes from "./routes/healthRoutes";
import incidentRoutes from "./routes/incidentRoutes";

const app = express();

app.use(cors());
app.use(express.json({ limit: "100kb" }));

app.use("/api/health", healthRoutes);
app.use("/api/incidents", incidentRoutes);

export default app;
