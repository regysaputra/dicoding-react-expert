import ThreadItem from "./ThreadItem.jsx";
import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router";

describe("ThreadItem component", () => {
  const mockThread = {
    id: 1,
    title: "How to use React Testing Library?",
    body: "I am learning how to test my React components.",
    createdAt: "2023-01-01T10:00:00.000Z",
    category: "React",
    owner: {
      id: 99,
      name: "John Doe",
    },
    upVotesBy: [
      { id: 101 },
      { id: 102 }
    ],
    downVotesBy: [
      { id: 103 }
    ],
    totalComments: 5,
  };

  it("should render thread data correctly", () => {
    // Arrange
    render(
      <BrowserRouter>
        <ThreadItem thread={mockThread} />
      </BrowserRouter>
    );

    // Assert
    expect(screen.getByText("How to use React Testing Library?")).toBeInTheDocument();
    expect(screen.getByText("I am learning how to test my React components.")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("5 comments")).toBeInTheDocument();

    // Assert vote count
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});