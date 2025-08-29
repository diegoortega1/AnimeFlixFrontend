import { useEffect, useState } from "react";
import type { User } from "./core/User";
import { getUser } from "./fetch";

export function useFetchUser() {
  const [user, setUser] = useState<User>();
  const [errors, setErrors] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await getUser();
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
