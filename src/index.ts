import "./config/LoadENV"; // must be first
import express, { Application, Request, Response } from "express";
import config from "./config";
import { connectDB } from "./database/sql";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "🚀 Quickly backend is running!" });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(config.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${config.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

void startServer();

export default app;
