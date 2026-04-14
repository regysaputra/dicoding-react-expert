import {asyncSetAuthUser, asyncUnsetAuthUser, setAuthUserActionCreator, unsetAuthUserActionCreator} from "./action.js";
import api from "../../utils/api.js";

jest.mock("../../utils/api.js", () => ({
  login: jest.fn(),
  getOwnProfile: jest.fn(),
  putAccessToken: jest.fn(),
}));

// Mock global alert
global.alert = jest.fn();

describe("authUser action creator", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("sync action creator", () => {
    it("should create SET_AUTH_USER action correctly", () => {
      // Arrange
      const authUser = {
        id: "user-1",
        name: "John Doe",
        email: "john_doe@gmail.com",
        avatar: "https://generated-image-url.jpg"
      };

      const expectedAction = {
        type: "SET_AUTH_USER",
        payload: {
          authUser,
        },
      };

      // Action
      const action = setAuthUserActionCreator(authUser);

      // Assert
      expect(action).toEqual(expectedAction);
    });

    it("should create UNSET_AUTH_USER action correctly", () => {
      // Arrange
      const expectedAction = {
        type: "UNSET_AUTH_USER",
        payload: {
          authUser: null,
        },
      };

      // Action
      const action = unsetAuthUserActionCreator(null);

      // Assert
      expect(action).toEqual(expectedAction);
    });
  });

  describe("async thunk", () => {
    describe("asyncSetAuthUser", () => {
      it("should dispatch action correctly when API call success", async () => {
        // Arrange
        const fakeCredentials = { email: "john_doe@gmail.com", password: "password" };
        const fakeToken = "fake-token";
        const fakeUser = { id: "user-1", name: "John Doe", email: "john_doe@gmail.com" };
        const dispatch = jest.fn();
        api.login.mockResolvedValue(fakeToken);
        api.getOwnProfile.mockResolvedValue(fakeUser);

        // Action
        await asyncSetAuthUser(fakeCredentials)(dispatch);

        // Assert
        expect(api.login).toHaveBeenCalledWith(fakeCredentials);
        expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
        expect(api.getOwnProfile).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUser));
      });

      it("should alert error when API call fails", async () => {
        // Arrange
        const fakeCredentials = { email: "john_doe@gmail.com", password: "password" };
        const fakeError = new Error("Invalid credentials");
        api.login.mockRejectedValue(fakeError);
        const dispatch = jest.fn();

        // Action
        await asyncSetAuthUser(fakeCredentials)(dispatch);

        // Assert
        expect(api.login).toHaveBeenCalledWith(fakeCredentials);
        expect(api.putAccessToken).not.toHaveBeenCalled();
        expect(api.getOwnProfile).not.toHaveBeenCalled();
        expect(dispatch).not.toHaveBeenCalled();
        expect(global.alert).toHaveBeenCalledWith(fakeError.message);
      });
    });

    describe("asyncUnsetAuthUser", () => {
      it("should dispatch action correctly when API call success", async () => {
        // Arrange
        const dispatch = jest.fn();

        // Action
        await asyncUnsetAuthUser()(dispatch);

        // Assert
        expect(api.putAccessToken).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
      });
    });
  });
});