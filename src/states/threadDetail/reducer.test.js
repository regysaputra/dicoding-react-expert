import threadDetailReducer from "./reducer.js";
import { ActionType } from "./action.js";

const initialState = {
  id: "thread-1",
  title: "Thread Pertama",
  body: "Ini adalah thread pertama",
  category: "General",
  createdAt: "2021-06-21T07:00:00.000Z",
  owner: {
    id: "users-1",
    name: "John Doe",
    avatar: "https://generated-image-url.jpg",
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: "comment-1",
      content: "Ini adalah komentar pertama",
      createdAt: "2021-06-21T07:00:00.000Z",
      owner: {
        id: "users-1",
        name: "John Doe",
        avatar: "https://generated-image-url.jpg",
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
};

describe("threadDetail reducer", () => {
  it("should return null when given unknown action", () => {
    // Arrange
    const action = { type: "UNKNOWN" };

    // Action
    const state = threadDetailReducer(undefined, action);

    // Assert
    expect(state).toEqual(null);
  });

  it("should return null when given no argument at all", () => {
    // Action
    const state = threadDetailReducer();

    // Assert
    expect(state).toEqual(null);
  });

  it("should return thread when given RECEIVE_THREAD_DETAIL", () => {
    // Arrange
    const initialState = {};
    const action = {
      type: "RECEIVE_THREAD_DETAIL",
      payload: {
        threadDetail: initialState,
      },
    };

    // Action
    const state = threadDetailReducer(initialState, action);

    // Assert
    expect(state).toEqual(initialState);
  });

  it("should add new comment when given ADD_COMMENT", () => {
    // Arrange
    const newComment = {
      id: "comment-1",
      content: "Ini adalah komentar pertama",
      createdAt: "2021-06-21T07:00:00.000Z",
      upVotesBy: [],
      downVotesBy: [],
      owner: {
        id: "users-1",
        name: "John Doe",
        email: "john@example.com",
      },
    };

    const action = {
      type: ActionType.ADD_COMMENT,
      payload: {
        comment: newComment,
      },
    };

    // Action
    const state = threadDetailReducer(initialState, action);

    // Assert
    expect(state.comments).toHaveLength(2);
    expect(state.comments[1]).toEqual(newComment);
  });

  it("should add userId to upVotesBy and remove this id from downVotesBy when given TOGGLE_UPVOTE_THREAD", () => {
    // Arrange
    const action = {
      type: ActionType.TOGGLE_UPVOTE_THREAD,
      payload: {
        userId: "users-1",
      },
    };
    const modifiedInitialState = {
      ...initialState,
      upvotesBy: ["users-1"],
      downVotesBy: ["users-2"],
    };

    // Action
    const state = threadDetailReducer(modifiedInitialState, action);

    // Assert
    expect(state.upVotesBy).toContain("users-1");
    expect(state.downVotesBy).not.toContain("users-1");
    expect(state.downVotesBy).toContain("users-2");
  });

  it("should add userId to downVoteBy and remove this id from upVotesBy when given TOGGLE_DOWNVOTE_THREAD", () => {
    // Arrange
    const action = {
      type: ActionType.TOGGLE_DOWNVOTE_THREAD,
      payload: {
        userId: "users-1",
      },
    };

    const modifiedInitialState = {
      ...initialState,
      upVotesBy: ["users-1", "users-2"],
    };

    // Action
    const state = threadDetailReducer(modifiedInitialState, action);

    // Assert
    expect(state.downVotesBy).toContain("users-1");
    expect(state.upVotesBy).not.toContain("users-1");
    expect(state.upVotesBy).toContain("users-2");
  });

  it("should return state unchange when given TOGGLE_NEUTRALIZEVOTE_THREAD action and user not vote yet", () => {
    // Arrange
    const action = {
      type: ActionType.TOGGLE_NEUTRALIZEVOTE_THREAD,
      payload: {
        userId: "users-1",
      },
    };

    // Action
    const state = threadDetailReducer(initialState, action);

    // Assert
    expect(state.upVotesBy).not.toContain("users-1");
    expect(state.downVotesBy).not.toContain("users-1");
  });

  it("should remove userId from upVotesBy and downVotesBy when given TOGGLE_NEUTRALIZEVOTE_THREAD", () => {
    // Arrange
    const action = {
      type: ActionType.TOGGLE_NEUTRALIZEVOTE_THREAD,
      payload: {
        userId: "users-1",
      },
    };
    const modifiedInitialState = {
      ...initialState,
      upVotesBy: ["users-1"],
      downVotesBy: ["users-1"],
    };

    // Action
    const state = threadDetailReducer(modifiedInitialState, action);

    // Assert
    expect(state.upVotesBy).not.toContain("users-1");
    expect(state.downVotesBy).not.toContain("users-1");
  });

  it("should add userId to comment upVotesBy and remove this id from comment downVotesBy when given TOGGLE_UPVOTE_COMMENT", () => {
    // Arrange
    const action = {
      type: ActionType.TOGGLE_UPVOTE_COMMENT,
      payload: {
        userId: "users-1",
        commentId: "comment-1",
      },
    };

    const modifiedInitialState = {
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          downVotesBy: ["user-1", "users-2"],
        },
        {
          id: "comment-2",
          content: "Second comment",
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };

    // Action
    const state = threadDetailReducer(modifiedInitialState, action);
    const targetComment = state.comments.find(
      (comment) => comment.id === "comment-1",
    );
    const ignoredComment = state.comments.find(
      (comment) => comment.id === "comment-2",
    );

    // Assert
    expect(targetComment.upVotesBy).toContain("users-1");
    expect(ignoredComment.upVotesBy).not.toContain("users-1");
    expect(targetComment.downVotesBy).not.toContain("users-1");
  });

  it("should add userId to comment downVotesBy and remove this id from comment upVotesBy when given TOGGLE_DOWNVOTE_COMMENT", () => {
    // Arrange
    const action = {
      type: ActionType.TOGGLE_DOWNVOTE_COMMENT,
      payload: {
        userId: "users-1",
        commentId: "comment-1",
      },
    };

    const modifiedInitialState = {
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          // 🟢 Pre-populate the opposite array!
          upVotesBy: ["users-1", "users-2"],
        },
        {
          id: "comment-2",
          content: "Second comment",
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };

    // Action
    const state = threadDetailReducer(modifiedInitialState, action);
    const targetComment = state.comments.find(
      (comment) => comment.id === "comment-1",
    );
    const ignoredComment = state.comments.find(
      (comment) => comment.id === "comment-2",
    );

    // Assert
    expect(targetComment.downVotesBy).toContain("users-1");
    expect(ignoredComment.downVotesBy).not.toContain("users-1");
    expect(targetComment.upVotesBy).not.toContain("users-1");
  });

  it("should return state unchange when given TOGGLE_NEUTRALIZEVOTE_COMMENT action and user not vote comment yet", () => {
    // Arrange
    const action = {
      type: ActionType.TOGGLE_NEUTRALIZEVOTE_COMMENT,
      payload: {
        userId: "users-1",
        commentId: "comment-1",
      },
    };

    // Action
    const state = threadDetailReducer(initialState, action);

    // Assert
    expect(state.comments[0].upVotesBy).not.toContain("users-1");
    expect(state.comments[0].downVotesBy).not.toContain("users-1");
  });

  it("should remove userId from comment upVotesBy and comment downVotesBy when given TOGGLE_NEUTRALIZEVOTE_COMMENT", () => {
    // Arrange
    const action = {
      type: ActionType.TOGGLE_NEUTRALIZEVOTE_COMMENT,
      payload: {
        userId: "users-1",
        commentId: "comment-1",
      },
    };

    const modifiedInitialState = {
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          // 🟢 Pre-populate BOTH arrays
          upVotesBy: ["users-1", "users-2"],
          downVotesBy: ["users-1", "users-2"],
        },
        {
          id: "comment-2",
          content: "Second comment",
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };

    // Action
    const state = threadDetailReducer(modifiedInitialState, action);

    // Assert
    expect(state.comments[0].upVotesBy).not.toContain("users-1");
    expect(state.comments[0].downVotesBy).not.toContain("users-1");
  });
});
