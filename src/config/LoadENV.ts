import path from "path";
import fs from "fs";
import dotenv from "dotenv";

// Pick NODE_ENV-specific file if present; fallback to .env
const nodeEnv = process.env.NODE_ENV || "development"; // default to development if NODE_ENV is not set
const candidates = [`.env.${nodeEnv}`, `.env`]; // Check for the existence of each candidate file and load the first one found

for (const c of candidates) { // Resolve the absolute path of the candidate file
  const p = path.resolve(process.cwd(), c);
  if (fs.existsSync(p)) {
    dotenv.config({ path: p });
    break;
  }
}
