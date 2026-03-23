import "./config/LoadENV";
import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import config from "./config";
import { connectDB } from "./database/sql";
import authRoutes from "./routes/auth.routes";

const app: Application = express();

// Middleware first — before any routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev")); // 👈 must be here, before routes

// Body logger
app.use((req, res, next) => {
  if (req.body && Object.keys(req.body).length > 0) {
    console.log("Body:", JSON.stringify(req.body, null, 2));
  }
  next();
});

// Routes — after middleware
app.use("/api/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Quickly backend is running!" });
});

const start = async () => {
  await connectDB();
  app.listen(config.PORT, () => {
    console.log(`Server running on http://localhost:${config.PORT}`);
  });
};

start();

export default app;