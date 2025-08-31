import { useEffect, useState } from "react";
import type { User } from "@/domain/models/User";
import { UserService } from "@/application/UserService";
import { HttpUserRepository } from "@/infra/HttpUserRepository";

export function useFetchUser() {
  const [user, setUser] = useState<User>();
  const [errors, setErrors] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await UserService.listInfo({
        userRepository: HttpUserRepository,
      });
      setUser(response);
    } catch (error: any) {
      setErrors(error.message || "Unexpected error");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, fetchUser, errors };
}
