import type { User } from "@/domain/models/User";
import type { AuthRepository } from "@/domain/repository/AuthRepository";

interface AuthRequest {
  authRepository: AuthRepository;
  user: User;
}

export const AuthService = {
  login: async ({ authRepository, user }: AuthRequest) => {
    const token = await authRepository.login(user);
    return token;
  },

  register: async ({ authRepository, user }: AuthRequest) => {
    const animes = await authRepository.register(user);
    return animes;
  },
};
