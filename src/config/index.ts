import "./LoadENV";

// Load environment variables from .env file
const {
  PORT,
  DB_DIALECT,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  JWT_SECRET,
  JWT_EXPIRES_IN,
} = process.env;

const port = Number(PORT ?? 5050);
const dbPort = Number(DB_PORT ?? 3306);

export default {
  PORT: Number.isNaN(port) ? 5050 : port,
  DB_DIALECT: DB_DIALECT || "mysql",
  DB_HOST: DB_HOST || "localhost",
  DB_PORT: Number.isNaN(dbPort) ? 3306 : dbPort,
  DB_USERNAME: DB_USERNAME || "root",
  DB_PASSWORD: DB_PASSWORD || "admin123",
  DB_NAME: DB_NAME || "quickly_db",
  JWT_SECRET: JWT_SECRET || "dev_secret_change_me",
  JWT_EXPIRES_IN: JWT_EXPIRES_IN || "1d",
};
