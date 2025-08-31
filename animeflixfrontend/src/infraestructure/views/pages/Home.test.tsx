import { render, screen } from "@testing-library/react";
import Home from "./Home";
import * as useHomeLoadHook from "../hooks/useHomeLoad";
import { vi, describe, it, beforeEach, expect } from "vitest";

vi.mock("../components/Header", () => ({
  Header: () => <div data-testid="header">Header</div>,
}));

vi.mock("../components/LoaderScreen", () => ({
  LoaderScreen: () => <div data-testid="loader">Loading...</div>,
}));

vi.mock("../components/RowContent", () => ({
  RowContent: ({ title }: { title: string }) => (
    <div data-testid={`rowcontent-${title.replace(/\s+/g, "-").toLowerCase()}`}>
      {title}
    </div>
  ),
}));

describe("Home component", () => {
  const fetchUserMock = vi.fn();

  const mockAnime = {
    id: 1,
    url: "https://example.com/anime",
    title: "Mock Anime",
    episodes: 12,
    score: 8.5,
    synopsis: "A mock synopsis",
    year: 2022,
    genres: ["Action", "Fantasy"],
    trailer: "https://example.com/trailer",
    image: "https://example.com/image.jpg",
  };

  const mockUser = {
    username: "john_doe",
    email: "john@example.com",
    password: "123456",
    animesFavorites: [mockAnime],
  };

  const mockAnimes = {
    top: [mockAnime],
    bypopularity: [mockAnime],
    upcoming: [mockAnime],
    airing: [mockAnime],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render Header and all RowContent sections correctly", () => {
    vi.spyOn(useHomeLoadHook, "useHomeLoad").mockReturnValue({
      user: mockUser,
      animes: mockAnimes,
      loading: false,
      loading2: false,
      fetchUser: fetchUserMock,
    });

    render(<Home />);

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("rowcontent-your-favorites")).toBeInTheDocument();
    expect(screen.getByTestId("rowcontent-most-viewed")).toBeInTheDocument();
    expect(screen.getByTestId("rowcontent-top-rated")).toBeInTheDocument();
    expect(
      screen.getByTestId("rowcontent-coming-soon-on-animeflix")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("rowcontent-currently-airing")
    ).toBeInTheDocument();
  });

  it("should NOT render favorites section when user.animesFavorites is empty or undefined", () => {
    vi.spyOn(useHomeLoadHook, "useHomeLoad").mockReturnValue({
      user: { ...mockUser, animesFavorites: [] },
      animes: mockAnimes,
      loading: false,
      loading2: false,
      fetchUser: fetchUserMock,
    });

    render(<Home />);
    expect(
      screen.queryByTestId("rowcontent-your-favorites")
    ).not.toBeInTheDocument();

    vi.spyOn(useHomeLoadHook, "useHomeLoad").mockReturnValue({
      user: {
        username: "no_favs",
        email: "test@example.com",
        password: "123456",
        animesFavorites: undefined,
      },
      animes: mockAnimes,
      loading: false,
      loading2: false,
      fetchUser: fetchUserMock,
    });

    render(<Home />);
    expect(
      screen.queryByTestId("rowcontent-your-favorites")
    ).not.toBeInTheDocument();
  });
});
