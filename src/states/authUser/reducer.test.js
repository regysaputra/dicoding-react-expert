import authUserReducer from "./reducer.js";
import { ActionType } from "./action.js";

const initialState = {
  authUser: {
    id: "john_doe",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://generated-image-url.jpg",
  },
};

describe("authUser reducer", () => {
  it("should return the initial state when given unknown action", () => {
    // Arrange
    const action = {
      type: "UNKNOWN",
    };

    // Action
    const state = authUserReducer(initialState, action);

    // Assert
    expect(state).toEqual(initialState);
  });

  it("should return null when given no argument at all", () => {
    // Action
    const state = authUserReducer();

    // Assert
    expect(state).toEqual(null);
  });

  it("should return state when given SET_AUTH_USER action", () => {
    // Arrange
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: initialState,
    };

    // Action
    const state = authUserReducer(initialState, action);

    // Assert
    expect(state).toEqual(initialState.authUser);
  });

  it("should return null when given UNSET_AUTH_USER action", () => {
    // Arrange
    const action = {
      type: ActionType.UNSET_AUTH_USER,
    };

    // Action
    const state = authUserReducer(initialState, action);

    // Assert
    expect(state).toEqual(null);
  });
});
