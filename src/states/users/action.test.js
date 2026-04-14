import {asyncPopulateUsers, asyncRegisterUser, receiveUsersActionCreator} from "./action.js";
import api from "../../utils/api.js";

jest.mock("../../utils/api.js", () => ({
  register: jest.fn(),
  getAllUsers: jest.fn(),
}));

// Mock global alert
global.alert = jest.fn();

describe('users action', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('sync action', () => {
    it("should create RECEIVE_USERS action correctly", () => {
      // Arrange
      const users = [
        {
          id: "john_doe",
          name: "John Doe",
          email: "john@example.com",
          avatar: "https://generated-image-url.jpg"
        }
      ]

      const expectedAction = {
        type: "RECEIVE_USERS",
        payload: {
          users,
        },
      };

      // Action
      const action = receiveUsersActionCreator(users);

      // Assert
      expect(action).toEqual(expectedAction);
    });
  });

  describe("async thunk", () => {
    describe("asyncRegisterUser", () => {
      it("should dispatch action correctly when API call success", async () => {
        // Arrange
        const fakeCredentials = { name: "John Doe", email: "john_doe@gmail.com", password: "password" };

        // Action
        await asyncRegisterUser(fakeCredentials)();

        // Assert
        expect(api.register).toHaveBeenCalledWith(fakeCredentials);
      });

      it("should alert error when API call fails", async () => {
        // Arrange
        const fakeCredentials = { name: "John Doe", email: "john_doe@gmail.com", password: "password" };
        const fakeError = new Error("Invalid credentials");
        api.register.mockRejectedValue(fakeError);

        // Action
        await asyncRegisterUser(fakeCredentials)();

        // Assert
        expect(api.register).toHaveBeenCalledWith(fakeCredentials);
        expect(global.alert).toHaveBeenCalledWith(fakeError.message);
      });
    });

    describe("asyncPopulateUsers", () => {
      it("should dispatch action correctly when API call success", async () => {
        // Arrange
        const fakeUsers = [{
          id: "john_doe",
          name: "John Doe",
          email: "john@example.com",
          avatar: "https://generated-image-url.jpg"
        }];

        api.getAllUsers.mockResolvedValue(fakeUsers);
        const dispatch = jest.fn();

        // Action
        await asyncPopulateUsers()(dispatch);

        // Assert
        expect(api.getAllUsers).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsers));
      });

      it("should alert error when API call fails", async () => {
        // Arrange
        const fakeError = new Error("Failed to fetch users");
        api.getAllUsers.mockRejectedValue(fakeError);
        const dispatch = jest.fn();

        // Action
        await asyncPopulateUsers()(dispatch);

        // Assert
        expect(api.getAllUsers).toHaveBeenCalled();
        expect(global.alert).toHaveBeenCalledWith(fakeError.message);
      });
    });
  });
});