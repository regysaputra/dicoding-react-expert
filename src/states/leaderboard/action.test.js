import {
  asyncPopulateLeaderboard,
  receiveLeaderboardActionCreator,
} from "./action.js";
import api from "../../utils/api.js";

jest.mock("../../utils/api.js", () => ({
  getLeaderboard: jest.fn(),
}));

// Mock global alert
global.alert = jest.fn();

describe("leaderboard action", () => {
  describe("sync action creator", () => {
    it("should create RECEIVE_LEADERBOARD action correctly", () => {
      // Arrange
      const leaderboards = [
        {
          user: {
            id: "users-1",
            name: "",
            email: "",
            avatar: "https://generated-image-url.jpg",
          },
          score: 10,
        },
      ];

      const expectedAction = {
        type: "RECEIVE_LEADERBOARD",
        payload: { leaderboard: leaderboards },
      };

      // Action
      const action = receiveLeaderboardActionCreator(leaderboards);

      // Assert
      expect(action).toEqual(expectedAction);
    });
  });

  describe("async thunk", () => {
    describe("getLeaderboard", () => {
      it("should dispatch action correctly when API call success", async () => {
        // Arrange
        const leaderboards = [
          {
            user: {
              id: "users-1",
              name: "",
              email: "",
              avatar: "https://generated-image-url.jpg",
            },
            score: 10,
          },
        ];
        api.getLeaderboard.mockResolvedValue(leaderboards);
        const dispatch = jest.fn();

        // Action
        await asyncPopulateLeaderboard()(dispatch);

        // Assert
        expect(api.getLeaderboard).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(
          receiveLeaderboardActionCreator(leaderboards),
        );
      });

      it("should alert error when API call fails", async () => {
        // Arrange
        const error = new Error("API call failed");
        api.getLeaderboard.mockRejectedValue(error);
        const dispatch = jest.fn();

        // Action
        await asyncPopulateLeaderboard()(dispatch);

        // Assert
        expect(api.getLeaderboard).toHaveBeenCalled();
        expect(dispatch).not.toHaveBeenCalled();
        expect(global.alert).toHaveBeenCalledWith(error.message);
      });
    });
  });
});
