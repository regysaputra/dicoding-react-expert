import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router";
import Header from "./Header";

const mockedNavigate = jest.fn();

jest.mock("react-router", () => ({
  // Keep all the actual React Router components (like <Link> and <BrowserRouter>)
  ...jest.requireActual("react-router"),
  // But override the hooks with our own spies!
  useNavigate: () => mockedNavigate,
  useLocation: () => ({ pathname: "/" }),
}));

describe("Header component", () => {
  const mockOnLogout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 🧱 MOCK DATA
  const mockAuthUser = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
  };

  it("should render Login button when user is not logged in", () => {
    // Arrange: Pass undefined for authUser
    render(
      <BrowserRouter>
        <Header authUser={undefined} onLogout={mockOnLogout} />
      </BrowserRouter>,
    );

    // Assert
    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(loginButton).toBeInTheDocument();
  });

  it("should navigate to /login when Login button is clicked", async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Header authUser={undefined} onLogout={mockOnLogout} />
      </BrowserRouter>,
    );
    const loginButton = screen.getByRole("button", { name: "Login" });

    // Action
    await user.click(loginButton);

    // Assert: Did our mocked navigate function get called with the right path?
    expect(mockedNavigate).toHaveBeenCalledWith("/login");
  });

  it("should render user avatar when user is logged in", () => {
    // Arrange: Pass the mock user
    render(
      <BrowserRouter>
        <Header authUser={mockAuthUser} onLogout={mockOnLogout} />
      </BrowserRouter>,
    );

    // Assert: The avatar should show the first two letters of the name ("Jo")
    expect(screen.getByText("Jo")).toBeInTheDocument();
    // The Login button should NOT be there anymore
    expect(
      screen.queryByRole("button", { name: "Login" }),
    ).not.toBeInTheDocument();
  });

  it("should open dropdown menu when avatar is clicked", async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Header authUser={mockAuthUser} onLogout={mockOnLogout} />
      </BrowserRouter>,
    );

    // The avatar button contains the text "Jo"
    const avatarButton = screen.getByText("Jo").closest("button");

    // Action
    await user.click(avatarButton);

    // Assert: The dropdown menu should now be visible
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /log out/i }),
    ).toBeInTheDocument();
  });

  it("should call onLogout function when Log out button is clicked", async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Header authUser={mockAuthUser} onLogout={mockOnLogout} />
      </BrowserRouter>,
    );

    // 1. Open the menu first
    const avatarButton = screen.getByText("Jo").closest("button");
    await user.click(avatarButton);

    // 2. Find and click the Log out button
    const logoutButton = screen.getByRole("button", { name: /log out/i });
    await user.click(logoutButton);

    // Assert
    expect(mockOnLogout).toHaveBeenCalled();
  });

  it("should close dropdown menu when clicking outside", async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <Header authUser={mockAuthUser} onLogout={mockOnLogout} />
      </BrowserRouter>,
    );

    // 1. Click the avatar to open the menu
    const avatarButton = screen.getByText("Jo").closest("button");
    await user.click(avatarButton);

    // Verify the menu is currently open
    expect(
      screen.getByRole("button", { name: /log out/i }),
    ).toBeInTheDocument();

    // 2. Action - Simulate clicking outside the menu (on the document body)
    await user.click(document.body);

    // Assert - The menu should now be closed and gone from the document
    expect(
      screen.queryByRole("button", { name: /log out/i }),
    ).not.toBeInTheDocument();
  });
});
