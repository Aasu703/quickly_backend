import { Request, Response } from "express";
import authService from "../services/auth.service";
import { RegisterDTO, LoginDTO } from "../dto/auth.dto";
import {AppError} from "../errors/AppError";

class AuthController {
  async register(req: Request, res: Response) {
    // Validate request body with Zod
    const result = RegisterDTO.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      });
    }

    try {
      const user = await authService.register(result.data);
      return res.status(201).json({
        message: "User registered successfully",
        data: user,
      });
    } catch (error) {
        console.error("REGISTER ERROR:", error); 
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async login(req: Request, res: Response) {
    // Validate request body with Zod
    const result = LoginDTO.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      });
    }

    try {
      const data = await authService.login(result.data);
      return res.status(200).json({
        message: "Login successful",
        data,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new AuthController();