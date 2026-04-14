import usersReducer from "./reducer.js";

const initialState = [
  {
    id: "john_doe",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://generated-image-url.jpg"
  }
];

describe("users reducer", () => {
  it("should return the initial state when given unknown action", () => {
    // Arrange
    const action = {
      type: "UNKNOWN",
    };

    // Action
    const state = usersReducer(initialState, action);

    // Assert
    expect(state).toEqual(initialState);
  });

  it("should return empty array when given no argument at all", () => {
    // Action
    const state = usersReducer();

    // Assert
    expect(state).toEqual([]);
  });

  it("should return all user when given RECEIVE_USERS action", () => {
    // Arrange
    const action = {
      type: "RECEIVE_USERS",
      payload: {
        users: initialState,
      },
    };

    // Action
    const state = usersReducer(initialState, action);

    // Assert
    expect(state).toEqual(initialState);
  });
});