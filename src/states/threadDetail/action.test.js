// Mock api module
import {
  addCommentActionCreator, asyncAddComment,
  asyncReceiveThreadDetail,
  asyncToggleDownVoteComment, asyncToggleDownVoteThread,
  asyncToggleNeutralizeVoteComment, asyncToggleNeutralizeVoteThread, asyncToggleUpVoteComment,
  asyncToggleUpVoteThread, receiveThreadDetailActionCreator, toggleDownVoteCommentActionCreator,
  toggleDownVoteThreadActionCreator, toggleNeutralizeVoteCommentActionCreator,
  toggleNeutralizeVoteThreadActionCreator, toggleUpVoteCommentActionCreator, toggleUpVoteThreadActionCreator
} from "./action.js";
import api from "../../utils/api.js";

jest.mock("../../utils/api.js", () => ({
  getThreadDetail: jest.fn(),
  createComment: jest.fn(),
  upVoteThread: jest.fn(),
  downVoteThread: jest.fn(),
  neutralizeVoteThread: jest.fn(),
  upVoteComment: jest.fn(),
  downVoteComment: jest.fn(),
  neutralizeVoteComment: jest.fn(),
}));

// Mock global alert
global.alert = jest.fn();

const fakeErrorResponse = new Error("Network Error");
const fakeAuthUser = { id: "user-1" };
const fakeGetState = () => ({ authUser: fakeAuthUser });

describe("Thread detail action creators", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("sync action creator", () => {
    it("should create RECEIVE_THREAD_DETAIL action correctly", () => {
      const threadDetail = { id: "thread-1", title: "Thread 1" };
      const expectedAction = { type: "RECEIVE_THREAD_DETAIL", payload: { threadDetail } };
      expect(receiveThreadDetailActionCreator(threadDetail)).toEqual(expectedAction);
    });

    it("should create ADD_COMMENT action correctly", () => {
      const comment = { id: "comment-1", title: "Comment 1" };
      const expectedAction = { type: "ADD_COMMENT", payload: { comment } };
      expect(addCommentActionCreator(comment)).toEqual(expectedAction);
    });

    it("should create TOGGLE_UPVOTE_THREAD action correctly", () => {
      const userId = "user-1";
      const expectedAction = { type: "TOGGLE_UPVOTE_THREAD", payload: { userId } };
      expect(toggleUpVoteThreadActionCreator(userId)).toEqual(expectedAction);
    });

    it("should create TOGGLE_DOWNVOTE_THREAD action correctly", () => {
      const userId = "user-1";
      const expectedAction = { type: "TOGGLE_DOWNVOTE_THREAD", payload: { userId } };
      expect(toggleDownVoteThreadActionCreator(userId)).toEqual(expectedAction);
    });

    it("should create TOGGLE_NEUTRALIZEVOTE_THREAD action correctly", () => {
      const userId = "user-1";
      const expectedAction = { type: "TOGGLE_NEUTRALIZEVOTE_THREAD", payload: { userId } };
      expect(toggleNeutralizeVoteThreadActionCreator(userId)).toEqual(expectedAction);
    });

    it("should create TOGGLE_UPVOTE_COMMENT action correctly", () => {
      const userId = "user-1";
      const expectedAction = { type: "TOGGLE_UPVOTE_COMMENT", payload: { userId } };
      expect(toggleUpVoteCommentActionCreator(userId)).toEqual(expectedAction);
    });

    it("should create TOGGLE_DOWNVOTE_COMMENT action correctly", () => {
      const userId = "user-1";
      const expectedAction = { type: "TOGGLE_DOWNVOTE_COMMENT", payload: { userId } };
      expect(toggleDownVoteCommentActionCreator(userId)).toEqual(expectedAction);
    })

    it("should create TOGGLE_NEUTRALIZEVOTE_COMMENT action correctly", () => {
      const userId = "user-1";
      const expectedAction = { type: "TOGGLE_NEUTRALIZEVOTE_COMMENT", payload: { userId } };
      expect(toggleNeutralizeVoteCommentActionCreator(userId)).toEqual(expectedAction);
    });
  })

  describe("async thunk", () => {
    describe("asyncReceiveThreadDetail", () => {
      it("should dispatch action correctly when API call success", async () => {
        // Arrange
        const fakeThreadDetail = { id: "thread-1", title: "Thread 1" };
        api.getThreadDetail.mockResolvedValue(fakeThreadDetail);
        const dispatch = jest.fn(); // spy on dispatch

        // Action
        await asyncReceiveThreadDetail("thread-1")(dispatch);

        // Assert
        expect(api.getThreadDetail).toHaveBeenCalledWith("thread-1");
        expect(dispatch).toHaveBeenCalledWith(receiveThreadDetailActionCreator(fakeThreadDetail));
      });

      it("should alert error when API call fails", async () => {
        // Arrange
        api.getThreadDetail.mockRejectedValue(fakeErrorResponse);
        const dispatch = jest.fn();

        // Action
        await asyncReceiveThreadDetail("thread-1")(dispatch);

        // Assert
        expect(global.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
      });
    });

    describe("asyncAddComment", () => {
      it("should dispatch action correctly when API call success", async () => {
        // Arrange
        const fakeNewComment = { id: "comment-1", content: "Comment 1" };
        api.createComment.mockResolvedValue(fakeNewComment);
        const dispatch = jest.fn(); // spy on dispatch

        // Action
        await asyncAddComment("comment-1", "Comment 1")(dispatch);

        // Assert
        expect(api.createComment).toHaveBeenCalledWith("comment-1", "Comment 1");
        expect(dispatch).toHaveBeenCalledWith(addCommentActionCreator(fakeNewComment));
      });

      it("should alert error when API call fails", async () => {
        // Arrange
        api.createComment.mockRejectedValue(fakeErrorResponse);
        const dispatch = jest.fn();

        // Action
        await asyncAddComment("comment-1", "Comment 1")(dispatch);

        // Assert
        expect(global.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
      });
    });

    describe("asyncToggleUpVoteThread", () => {
      it("should dispatch action correctly when API call success", async () => {
        // Arrange
        api.upVoteThread.mockResolvedValue();
        const dispatch = jest.fn(); // spy on dispatch

        // Action
        await asyncToggleUpVoteThread("thread-1")(dispatch, fakeGetState);

        // Assert
        expect(api.upVoteThread).toHaveBeenCalledWith("thread-1");
        expect(dispatch).toHaveBeenCalledWith(toggleUpVoteThreadActionCreator(fakeAuthUser.id));
      });

      it("should rollback vote and alert error when API call fails", async () => {
        // Arrange
        api.upVoteThread.mockRejectedValue(fakeErrorResponse);
        const dispatch = jest.fn();

        // Action
        await asyncToggleUpVoteThread("thread-1")(dispatch, fakeGetState);

        // Assert
        expect(dispatch).toHaveBeenCalledWith(toggleUpVoteThreadActionCreator(fakeAuthUser.id));
        expect(global.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
        expect(dispatch).toHaveBeenCalledWith(toggleNeutralizeVoteThreadActionCreator(fakeAuthUser.id));
      });
    });

    describe("asyncToggleDownVoteThread", () => {
      it("should dispatch action correctly when API call success", async () => {
        // Arrange
        api.downVoteThread.mockResolvedValue();
        const dispatch = jest.fn(); // spy on dispatch

        // Action
        await asyncToggleDownVoteThread("thread-1")(dispatch, fakeGetState);

        // Assert
        expect(api.downVoteThread).toHaveBeenCalledWith("thread-1");
        expect(dispatch).toHaveBeenCalledWith(toggleDownVoteThreadActionCreator(fakeAuthUser.id));
      });

      it("should alert error when API call fails", async () => {
        // Arrange
        api.downVoteThread.mockRejectedValue(fakeErrorResponse);
        const dispatch = jest.fn();

        // Action
        await asyncToggleDownVoteThread("thread-1")(dispatch, fakeGetState);

        // Assert
        expect(dispatch).toHaveBeenCalledWith(toggleDownVoteThreadActionCreator(fakeAuthUser.id));
        expect(global.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
        expect(dispatch).toHaveBeenCalledWith(toggleNeutralizeVoteThreadActionCreator(fakeAuthUser.id));
      });
    });

    describe("asyncToggleNeutralizeVoteThread", () => {
      it("should dispatch action correctly when API call success", async () => {
        // Arrange
        api.neutralizeVoteThread.mockResolvedValue();
        const dispatch = jest.fn(); // spy on dispatch

        // Action
        await asyncToggleNeutralizeVoteThread("thread-1")(dispatch, fakeGetState);

        // Assert
        expect(api.neutralizeVoteThread).toHaveBeenCalledWith("thread-1");
        expect(dispatch).toHaveBeenCalledWith(toggleNeutralizeVoteThreadActionCreator(fakeAuthUser.id));
      });

      it("should alert error when API call fails", async () => {
        // Arrange
        api.neutralizeVoteThread.mockRejectedValue(fakeErrorResponse);
        const dispatch = jest.fn();

        // Action
        await asyncToggleNeutralizeVoteThread("thread-1")(dispatch, fakeGetState);

        // Assert
        expect(dispatch).toHaveBeenCalledWith(toggleNeutralizeVoteThreadActionCreator(fakeAuthUser.id));
        expect(global.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
      });
    });

    describe("asyncToggleUpVoteComment", () => {
      it("should dispatch action correctly when API call success", async () => {
        // Arrange
        api.upVoteComment.mockResolvedValue();
        const dispatch = jest.fn(); // spy on dispatch

        // Action
        await asyncToggleUpVoteComment("thread-1", "comment-1")(dispatch, fakeGetState);

        // Assert
        expect(api.upVoteComment).toHaveBeenCalledWith("thread-1", "comment-1");
        expect(dispatch).toHaveBeenCalledWith(toggleUpVoteCommentActionCreator(fakeAuthUser.id, "comment-1"));
      });

      it("should alert error when API call fails", async () => {
        // Arrange
        api.upVoteComment.mockRejectedValue(fakeErrorResponse);
        const dispatch = jest.fn();

        // Action
        await asyncToggleUpVoteComment("thread-1", "comment-1")(dispatch, fakeGetState);

        // Assert
        expect(dispatch).toHaveBeenCalledWith(toggleUpVoteCommentActionCreator(fakeAuthUser.id, "comment-1"));
        expect(global.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
        expect(dispatch).toHaveBeenCalledWith(toggleNeutralizeVoteCommentActionCreator(fakeAuthUser.id, "comment-1"));
      });
    });

    describe("asyncToggleDownVoteComment", () => {
      it("should dispatch action correctly when API call success", async () => {
        // Arrange
        api.downVoteComment.mockResolvedValue();
        const dispatch = jest.fn(); // spy on dispatch

        // Action
        await asyncToggleDownVoteComment("thread-1", "comment-1")(dispatch, fakeGetState);

        // Assert
        expect(api.downVoteComment).toHaveBeenCalledWith("thread-1", "comment-1");
        expect(dispatch).toHaveBeenCalledWith(toggleDownVoteCommentActionCreator(fakeAuthUser.id, "comment-1"));
      });

      it("should alert error when API call fails", async () => {
        // Arrange
        api.downVoteComment.mockRejectedValue(fakeErrorResponse);
        const dispatch = jest.fn();

        // Action
        await asyncToggleDownVoteComment("thread-1", "comment-1")(dispatch, fakeGetState);

        // Assert
        expect(dispatch).toHaveBeenCalledWith(toggleDownVoteCommentActionCreator(fakeAuthUser.id, "comment-1"));
        expect(global.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
        expect(dispatch).toHaveBeenCalledWith(toggleNeutralizeVoteCommentActionCreator(fakeAuthUser.id, "comment-1"));
      });
    });

    describe("asyncToggleNeutralizeVoteComment", () => {
      it("should dispatch action correctly when API call success", async () => {
        // Arrange
        api.neutralizeVoteComment.mockResolvedValue();
        const dispatch = jest.fn(); // spy on dispatch

        // Action
        await asyncToggleNeutralizeVoteComment("thread-1", "comment-1")(dispatch, fakeGetState);

        // Assert
        expect(api.neutralizeVoteComment).toHaveBeenCalledWith("thread-1", "comment-1");
        expect(dispatch).toHaveBeenCalledWith(toggleNeutralizeVoteCommentActionCreator(fakeAuthUser.id, "comment-1"));
      });

      it("should alert error when API call fails", async () => {
        // Arrange
        api.neutralizeVoteComment.mockRejectedValue(fakeErrorResponse);
        const dispatch = jest.fn();

        // Action
        await asyncToggleNeutralizeVoteComment("thread-1", "comment-1")(dispatch, fakeGetState);

        // Assert
        expect(dispatch).toHaveBeenCalledWith(toggleNeutralizeVoteCommentActionCreator(fakeAuthUser.id, "comment-1"));
        expect(global.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
        expect(dispatch).toHaveBeenCalledWith(toggleNeutralizeVoteCommentActionCreator(fakeAuthUser.id, "comment-1"));
      });
    });
  });
});