import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Profile from "./Profile";
import * as useFetchUserHook from "../hooks/useFetchUser";
import { expect, vi, beforeEach, describe, it } from "vitest";
import { toast } from "sonner";
import { UserService } from "@/application/UserService";
import type { User } from "@/domain/models/User";

const navigateMock = vi.fn();

const mockUser: User = {
  username: "john_doe",
  email: "john@example.com",
  password: "123456",
};

vi.mock("react-router-dom", async () => {
  const actual = (await vi.importActual("react-router-dom")) as any;
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("Profile component", () => {
  const fetchUserMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(useFetchUserHook, "useFetchUser").mockReturnValue({
      user: mockUser,
      fetchUser: fetchUserMock,
      errors: null,
    });

    fetchUserMock.mockClear();
    navigateMock.mockClear();
  });

  it("renders user info and allows editing", async () => {
    render(<Profile />);

    expect(screen.getByText("About Me")).toBeInTheDocument();
    expect(screen.getByText(mockUser.username!)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();

    const editIcon = document.querySelector(
      ".w-4.h-4.cursor-pointer.text-red-500"
    );
    expect(editIcon).toBeTruthy();

    if (editIcon) fireEvent.click(editIcon);

    expect(screen.getByDisplayValue(mockUser.username!)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/nombre/i), {
      target: { value: "new_name" },
    });

    fireEvent.click(screen.getByText(/cancelar/i));

    expect(screen.queryByLabelText(/nombre/i)).not.toBeInTheDocument();

    if (editIcon) fireEvent.click(editIcon);

    fireEvent.change(screen.getByLabelText(/nombre/i), {
      target: { value: "new_name" },
    });

    const modifyUserSpy = vi
      .spyOn(UserService, "modifyUser")
      .mockResolvedValue(undefined);

    fireEvent.click(screen.getByText(/guardar/i));

    await waitFor(() => {
      expect(modifyUserSpy).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("Cambios realizados", {
        description: "Cambios realizados con éxito.",
      });
      expect(fetchUserMock).toHaveBeenCalled();
    });

    modifyUserSpy.mockRestore();
  });

  it("logs out user and navigates to login", () => {
    localStorage.setItem("authToken", "fake-token");

    render(<Profile />);

    fireEvent.click(screen.getByText(/cerrar sesión/i));

    expect(localStorage.getItem("authToken")).toBeNull();
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });
});
