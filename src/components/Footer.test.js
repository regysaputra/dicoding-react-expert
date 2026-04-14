import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer component", () => {
  it("should render all main sections and links correctly", () => {
    // Arrange
    render(<Footer />);

    // Assert - Check Brand & Description
    expect(screen.getByText("DevForum")).toBeInTheDocument();
    expect(
      screen.getByText("A modern discussion platform for developers and designers.")
    ).toBeInTheDocument();

    // Assert - Check Headings
    expect(screen.getByText("Quick Links")).toBeInTheDocument();
    expect(screen.getByText("Community")).toBeInTheDocument();
    expect(screen.getByText("Legal")).toBeInTheDocument();

    // Assert - Check specific link destinations
    expect(screen.getByRole("link", { name: "Discussions" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Leaderboard" })).toHaveAttribute("href", "/leaderboard");

    // Assert - Check Copyright text
    expect(screen.getByText("© 2026 Forum. All rights reserved.")).toBeInTheDocument();
  });
});