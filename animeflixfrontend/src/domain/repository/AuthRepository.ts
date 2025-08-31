import type { User } from "../models/User";

export interface AuthRepository {
  login(user: User): Promise<{ message: string; token: string }>;
  register(user: User): Promise<void>;
}
