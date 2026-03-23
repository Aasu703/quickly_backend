import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../repository/user.repository";
import { AppError } from "../errors/AppError";
import config from "../config";
import { RegisterDTOType, LoginDTOType } from "../dto/auth.dto";

class AuthService {
  async register(data: RegisterDTOType) {
    // Check if email already exists
    const existing = await userRepository.findByEmail(data.email);
    if (existing) {
      throw new AppError(409, "Email already registered");
    }

    // Hash the password
    const password_hash = await bcrypt.hash(data.password, 10);

    // Create the user
    const user = await userRepository.create({
      email: data.email,
      password_hash,
      full_name: data.full_name,
      phone: data.phone ?? null,
    });

    return {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
    };
  }

  async login(data: LoginDTOType) {
    // Find user by email
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
      throw new AppError(401, "Invalid email or password");
    }

    // Compare password
    const isMatch = await bcrypt.compare(data.password, user.password_hash);
    if (!isMatch) {
      throw new AppError(401, "Invalid email or password");
    }

    // Generate JWT token
    const jwtSecret = config.JWT_SECRET;
    const jwtExpiresIn = config.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"];

    const token = jwt.sign(
      { id: user.id, email: user.email },
      jwtSecret,
      { expiresIn: jwtExpiresIn }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
      },
    };
  }
}

export default new AuthService();