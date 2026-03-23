import { z } from "zod";

// Register DTO
export const RegisterDTO = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),

  full_name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name is too long"),

  phone: z
    .string()
    .regex(/^\+?[0-9]{7,15}$/, "Invalid phone number")
    .optional(),
});

// Login DTO
export const LoginDTO = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required"),

  password: z
    .string()
    .min(1, "Password is required"),
});

// Infer TypeScript types from the schemas
export type RegisterDTOType = z.infer<typeof RegisterDTO>;
export type LoginDTOType = z.infer<typeof LoginDTO>;