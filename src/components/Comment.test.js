import React from "react";
import { useDispatch } from "react-redux";
import { render, screen } from "@testing-library/react";
import Comment from "./Comment";
import { userEvent } from "@testing-library/user-event";
import {
  asyncToggleDownVoteComment,
  asyncToggleNeutralizeVoteComment,
  asyncToggleUpVoteComment,
} from "../states/threadDetail/action.js";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("../states/threadDetail/action.js", () => ({
  asyncToggleUpVoteComment: jest.fn(),
  asyncToggleDownVoteComment: jest.fn(),
  asyncToggleNeutralizeVoteComment: jest.fn(),
}));

describe("Comment component", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    jest.clearAllMocks();
  });

  const defaultProps = {
    userId: "user-1",
    threadId: "thread-1",
    comment: {
      id: "comment-1",
      content: "This is a comment",
      createdAt: "2023-01-01T00:00:00.000Z",
      owner: {
        id: "user-2",
        name: "User 2",
        avatar: "https://example.com/avatar.jpg",
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  };

  // UI Rendering Tests
  it("should render comment data correctly", () => {
    // Arrange
    render(<Comment {...defaultProps} />);

    // Assert
    expect(screen.getByText("This is a comment")).toBeInTheDocument();
    expect(screen.getByText("User 2")).toBeInTheDocument();

    // The component should render two button (upvote and downvote)
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });

  // User Interaction Test (Upvotes)
  it("should dispatch asyncToggleUpVoteComment when upvote button is clicked and user has not vote", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<Comment {...defaultProps} />);
    const upvoteButton = screen.getAllByRole("button")[0];

    // Action (virtual user click the button)
    await user.click(upvoteButton);

    // Assert
    expect(mockDispatch).toHaveBeenCalled();
    expect(asyncToggleUpVoteComment).toHaveBeenCalledWith(
      "thread-1",
      "comment-1",
    );
  });

  it("should dispatch asyncToggleNeutralVoteComment when upvote button is clicked and user has vote", async () => {
    // Arrange
    const user = userEvent.setup();
    const propsWithUpvote = {
      ...defaultProps,
      comment: {
        ...defaultProps.comment,
        upVotesBy: ["user-1"],
      },
    };

    render(<Comment {...propsWithUpvote} />);
    const upvoteButton = screen.getAllByRole("button")[0];

    // Action (virtual user click the button)
    await user.click(upvoteButton);

    // Assert
    expect(mockDispatch).toHaveBeenCalled();
    expect(asyncToggleNeutralizeVoteComment).toHaveBeenCalledWith(
      "thread-1",
      "comment-1",
    );
  });

  // User Interaction Test (Downvotes)
  it("should dispatch asyncToggleDownVoteComment when downvote button is clicked and user has not vote", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<Comment {...defaultProps} />);
    const downvoteButton = screen.getAllByRole("button")[1];

    // Action (virtual user click the button)
    await user.click(downvoteButton);

    // Assert
    expect(mockDispatch).toHaveBeenCalled();
    expect(asyncToggleDownVoteComment).toHaveBeenCalledWith(
      "thread-1",
      "comment-1",
    );
  });

  it("should dispatch asyncToggleNeutralVoteComment when downvote button is clicked and user has vote", async () => {
    // Arrange
    const user = userEvent.setup();
    const propsWithDownvote = {
      ...defaultProps,
      comment: {
        ...defaultProps.comment,
        downVotesBy: ["user-1"],
      },
    };

    render(<Comment {...propsWithDownvote} />);
    const downvoteButton = screen.getAllByRole("button")[1];

    // Action (virtual user clicks the button)
    await user.click(downvoteButton);

    // Assert
    expect(mockDispatch).toHaveBeenCalled();
    expect(asyncToggleNeutralizeVoteComment).toHaveBeenCalledWith(
      "thread-1",
      "comment-1",
    );
  });
});
