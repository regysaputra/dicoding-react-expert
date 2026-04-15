import leaderboardReducer from "./reducer.js";

const initialState = [
  {
    user: {
      id: "users-1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://generated-image-url.jpg",
    },
    score: 10,
  },
];

describe("Leaderboard Reducer", () => {
  it("should return the initial state when given unknown action", () => {
    // Arrange
    const action = { type: "UNKNOWN" };

    // Action
    const state = leaderboardReducer(initialState, action);

    // Assert
    expect(state).toEqual(initialState);
  });

  it("should return empty array when given no argument at all", () => {
    // Action
    const state = leaderboardReducer();

    // Assert
    expect(state).toEqual([]);
  });

  it("should return new state when given RECEIVE_LEADERBOARD action", () => {
    // Arrange
    const action = {
      type: "RECEIVE_LEADERBOARD",
      payload: {
        leaderboard: initialState,
      },
    };

    // Action
    const state = leaderboardReducer(initialState, action);

    // Assert
    expect(state).toEqual(initialState);
  });
});
