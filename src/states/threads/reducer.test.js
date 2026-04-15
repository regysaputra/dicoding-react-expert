import threadsReducer from "./reducer.js";
import { ActionType } from "./action.js";

describe("threadReducers function", () => {
  it("should return initial state when given unknown action", () => {
    // Arrange
    const initialState = [];
    const action = { type: "UNKNOWN" };

    // Action
    const latestState = threadsReducer(initialState, action);

    // Assert
    expect(latestState).toEqual(initialState);
  });

  it("should return empty array when given empty action", () => {
    // Action
    const latestState = threadsReducer();

    // Assert
    expect(latestState).toEqual([]);
  });

  it("should return all thread when given RECEIVE_THREADS action", () => {
    // Arrange
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
          {
            id: 1,
            title: "Thread 1",
            content: "Content 1",
            author: "Author 1",
          },
        ],
      },
    };

    // Action
    const latestState = threadsReducer(initialState, action);

    // Assert
    expect(latestState).toEqual(action.payload.threads);
  });

  it("should add new thread to the beginning of the array when given ADD_THREAD action", () => {
    // Arrange
    const initialState = [
      {
        id: 1,
        title: "Thread 1",
        content: "Content 1",
        author: "Author 1",
      },
    ];
    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: {
          id: 2,
          title: "Thread 2",
          content: "Content 2",
          author: "Author 2",
        },
      },
    };

    // Action
    const latestState = threadsReducer(initialState, action);

    // Assert
    expect(latestState).toEqual([action.payload.thread, ...initialState]);
  });
});
