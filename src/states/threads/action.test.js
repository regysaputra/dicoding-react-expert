import {
  ActionType,
  addThreadActionCreator,
  asyncAddThread,
  asyncPopulateThreads,
  receiveThreadsActionCreator
} from "./action.js";
import api from "../../utils/api.js";

jest.mock("../../utils/api.js", () => ({
  getAllThread: jest.fn(),
  createThread: jest.fn(),
}));

// Mock global alert
global.alert = jest.fn();

describe("threads action", () => {
  describe("sync action creator", () => {
    it("should create RECEIVE_THREADS action correctly", () => {
      // Arrange
      const threads = [
        {
          id: "thread-1",
          title: "Thread Pertama",
          body: "Ini adalah thread pertama",
          category: "General",
          createdAt: "2021-06-21T07:00:00.000Z",
          ownerId: "users-1",
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0
        }
      ];

      const expectedAction = {
        type: ActionType.RECEIVE_THREADS,
        payload: {
          threads,
        },
      };

      // Action
      const action = receiveThreadsActionCreator(threads);

      // Assert
      expect(action).toEqual(expectedAction);
    });

    it("should create ADD_THREAD action correctly", () => {
      // Arrange
      const thread = {
        id: "thread-1",
        title: "Thread Pertama",
        body: "Ini adalah thread pertama",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "users-1",
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0
      }

      const expectedAction = { type: ActionType.ADD_THREAD, payload: { thread } };

      // Action
      const action = addThreadActionCreator(thread);

      // Assert
      expect(action).toEqual(expectedAction);
    });
  });

  describe("async thunk", () => {
    describe("asyncPopulateThreads", () => {
      it("should dispatch action correctly when API call success", async () => {
        // Arrange
        const fakeThreads = [
          {
            id: "thread-1",
            title: "Thread Pertama",
            body: "Ini adalah thread pertama",
            category: "General",
            createdAt: "2021-06-21T07:00:00.000Z",
            ownerId: "users-1",
            upVotesBy: [],
          }
        ]

        const dispatch = jest.fn();
        api.getAllThread.mockResolvedValue(fakeThreads);

        // Action
        await asyncPopulateThreads()(dispatch);

        // Assert
        expect(api.getAllThread).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreads));
      });

      it("should alert error when API call fails", async () => {
        // Arrange
        const fakeError = new Error("Failed to fetch threads");
        api.getAllThread.mockRejectedValue(fakeError);
        const dispatch = jest.fn();

        // Action
        await asyncPopulateThreads()(dispatch);

        // Assert
        expect(api.getAllThread).toHaveBeenCalled();
        expect(dispatch).not.toHaveBeenCalled();
        expect(global.alert).toHaveBeenCalledWith(fakeError.message);
      });
    });

    describe("asyncAddThread", () => {
      it("should dispatch action correctly when API call success", async () => {
        // Arrange
        const fakeInput = { title: "Thread Pertama", body: "Ini adalah thread pertama", category: "General" };

        const fakeThread = {
          id: "thread-1",
          title: "Thread Pertama",
          body: "Ini adalah thread pertama",
          category: "General",
          createdAt: "2021-06-21T07:00:00.000Z",
          ownerId: "users-1",
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0
        }
        api.createThread.mockResolvedValue(fakeThread);
        const dispatch = jest.fn();

        // Action
        await asyncAddThread(fakeInput)(dispatch);

        // Assert
        expect(api.createThread).toHaveBeenCalledWith(fakeInput);
        expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeThread));
      });

      it("should alert error when API call fails", async () => {
        // Arrange
        const fakeInput = { title: "Thread Pertama", body: "Ini adalah thread pertama", category: "General" };
        const fakeError = new Error("Failed to create thread");
        api.createThread.mockRejectedValue(fakeError);
        const dispatch = jest.fn();

        // Action
        await asyncAddThread(fakeInput)(dispatch);

        // Assert
        expect(api.createThread).toHaveBeenCalledWith(fakeInput);
        expect(dispatch).not.toHaveBeenCalled();
        expect(global.alert).toHaveBeenCalledWith(fakeError.message);
      })
    });
  });
});