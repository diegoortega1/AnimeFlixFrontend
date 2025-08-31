import type { User } from "@/domain/models/User";
import type { AuthRepository } from "@/domain/repository/AuthRepository";

export const HttpAuthRepository: AuthRepository = {
  login: async (user: User) => {
    const response = await loginUser(user);
    return response;
  },
  register: async (user: User) => {
    const response = await registerUser(user);
    return response;
  },
};

export async function registerUser(user: User): Promise<any> {
  const response = await fetch("http://localhost:8000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  if (response.status !== 200)
    throw new Error(data.detail || data.message || "Error in register");
  return data;
}

export async function loginUser(user: User): Promise<any> {
  const response = await fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  if (response.status !== 200)
    throw new Error(data.detail || data.message || "Error in register");
  return data;
}
