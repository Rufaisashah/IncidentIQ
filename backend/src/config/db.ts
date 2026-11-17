
import "dotenv/config";
import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export async function testDbConnection() {
  const client = await pool.connect();

  try {
    const result = await client.query("SELECT NOW()");
    console.log(
      "PostgreSQL connected successfully:",
      result.rows[0]
    );
  } finally {
    client.release();
  }
}
