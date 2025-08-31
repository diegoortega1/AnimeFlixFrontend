import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

const mockedNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

vi.mock("@/application/AuthService", () => ({
  AuthService: {
    login: vi.fn(),
    register: vi.fn(),
  },
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

import { toast } from "sonner";
import { AuthService } from "@/application/AuthService";

describe("Login component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders login form initially", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText("Animeflix")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Iniciar sesión/i })
    ).toBeInTheDocument();
  });

  it("toggles to registration mode", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const toggleButton = screen.getByRole("button", {
      name: /Regístrate ahora/i,
    });
    await userEvent.click(toggleButton);
    expect(
      screen.getByRole("button", { name: /Registrarse/i })
    ).toBeInTheDocument();
  });

  it("updates email and password inputs", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "mypassword");

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("mypassword");
  });

  it("calls loginUser on submit when in login mode", async () => {
    (AuthService.login as any).mockResolvedValue({ token: "fake-token" });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByPlaceholderText("Email"), "user@test.com");
    await userEvent.type(screen.getByPlaceholderText("Password"), "123456");

    await userEvent.click(
      screen.getByRole("button", { name: /Iniciar sesión/i })
    );

    expect(AuthService.login).toHaveBeenCalledWith({
      authRepository: expect.any(Object),
      user: { email: "user@test.com", password: "123456" },
    });

    expect(localStorage.getItem("authToken")).toBe("fake-token");

    expect(mockedNavigate).toHaveBeenCalledWith("/home");
  });

  it("calls registerUser on submit when in registration mode", async () => {
    (AuthService.register as any).mockResolvedValue({});

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await userEvent.click(
      screen.getByRole("button", { name: /Regístrate ahora/i })
    );

    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "newuser@test.com"
    );
    await userEvent.type(screen.getByPlaceholderText("Password"), "abcdef");

    await userEvent.click(screen.getByRole("button", { name: /Registrarse/i }));

    expect(AuthService.register).toHaveBeenCalledWith({
      authRepository: expect.any(Object),
      user: { email: "newuser@test.com", password: "abcdef" },
    });

    expect(toast.success).toHaveBeenCalledWith("Usuario registrado", {
      description: "El usuario se ha registrado con éxito.",
    });
  });

  it("shows toast error if login fails", async () => {
    (AuthService.login as any).mockRejectedValue("Login error");

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByPlaceholderText("Email"), "fail@test.com");
    await userEvent.type(screen.getByPlaceholderText("Password"), "failpass");

    await userEvent.click(
      screen.getByRole("button", { name: /Iniciar sesión/i })
    );

    expect(toast.error).toHaveBeenCalledWith("Error al iniciar sesión", {
      description: "Se ha producido un error. Login error",
    });
  });

  it("shows toast error if registration fails", async () => {
    (AuthService.register as any).mockRejectedValue("Register error");

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await userEvent.click(
      screen.getByRole("button", { name: /Regístrate ahora/i })
    );

    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "failreg@test.com"
    );
    await userEvent.type(screen.getByPlaceholderText("Password"), "failpass");

    await userEvent.click(screen.getByRole("button", { name: /Registrarse/i }));

    expect(toast.error).toHaveBeenCalledWith("Error al registrarse", {
      description: "Se ha producido un error. Register error",
    });
  });
});
