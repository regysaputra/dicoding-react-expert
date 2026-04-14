import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./authUser/reducer";
import isPreloadReducer from "./isPreload/reducer";
import threadDetailReducer from "./threadDetail/reducer.js";
import threadsReducer from "./threads/reducer.js";
import usersReducer from "./users/reducer";
import leaderboardReducer from "./leaderboard/reducer.js";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    leaderboard: leaderboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // This disables the strict state mutation check to speed up development
      immutableCheck: false,

      // Alternatively, you can just turn off the console warning but keep the check:
      // immutableCheck: { warnAfter: 300 }
    }),
});

export default store;
