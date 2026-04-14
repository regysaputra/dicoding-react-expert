import React from "react";
import { render, screen } from "@testing-library/react";
import ThreadList from "./ThreadList";
import "@testing-library/jest-dom";
import {BrowserRouter} from "react-router";

describe("ThreadList component", () => {
  // 🧱 MOCK DATA (Array of threads)
  const mockThreadsArray = [
    {
      id: 1,
      title: "First Test Thread",
      body: "Body of first thread",
      createdAt: "2023-01-01T10:00:00.000Z",
      category: "General",
      owner: { id: 10, name: "User A" },
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 2,
    },
    {
      id: 2,
      title: "Second Test Thread",
      body: "Body of second thread",
      createdAt: "2023-01-02T10:00:00.000Z",
      category: "Help",
      owner: { id: 11, name: "User B" },
      upVotesBy: [{ id: 99 }],
      downVotesBy: [],
      totalComments: 0,
    },
  ];

  it("should render a list of threads correctly", () => {
    // Arrange
    render(
      <BrowserRouter>
        <ThreadList threads={mockThreadsArray} />
      </BrowserRouter>
    );

    // Assert - Check if both titles rendered successfully
    expect(screen.getByText("First Test Thread")).toBeInTheDocument();
    expect(screen.getByText("Second Test Thread")).toBeInTheDocument();

    // Assert - Check if the correct authors rendered
    expect(screen.getByText("User A")).toBeInTheDocument();
    expect(screen.getByText("User B")).toBeInTheDocument();
  });
});