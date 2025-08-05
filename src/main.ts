import { config } from "dotenv";
import { Server } from "./server/server.js";

// Load environment variables
config();

// Validate required environment variables
const requiredEnvVars = [
  "SERVER_WALLET_ADDRESS",
  "CDP_API_KEY_ID",
  "CDP_API_KEY_SECRET",
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

new Server();
