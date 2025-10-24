import { GenericResponse } from './generic-response.model';

export interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isActive: boolean;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthData {
  token?: string;
  user?: User;
}

export interface TokenRequest {
  token: string;
}

// Response types using GenericResponse
export type LoginResponse = GenericResponse<AuthData>;
export type RegisterResponse = GenericResponse<AuthData>;
export type UserResponse = GenericResponse<User>;
export type TokenValidationResponse = GenericResponse<boolean>;
