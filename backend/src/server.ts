
import "dotenv/config";
import app from "./app";
import { pool, testDbConnection } from "./config/db";

const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  try {
    await testDbConnection();

    const server = app.listen(PORT, () => {
      console.log(`IncidentIQ backend running on port ${PORT}`);
    });

    const shutdown = () => {
      server.close(() => {
        pool.end().finally(() => process.exit(0));
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error("Failed to start IncidentIQ backend:", error);
    process.exit(1);
  }
}

startServer();
