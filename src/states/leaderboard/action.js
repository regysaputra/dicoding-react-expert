import api from '../../utils/api.js';

const ActionType = {
  RECEIVE_LEADERBOARD: 'RECEIVE_LEADERBOARD',
};

function receiveLeaderboardActionCreator(leaderboard) {
  return {
    type: ActionType.RECEIVE_LEADERBOARD,
    payload: {
      leaderboard,
    },
  };
}

function asyncPopulateLeaderboard() {
  return async (dispatch) => {
    try {
      const leaderboard = await api.getLeaderboard();

      dispatch(receiveLeaderboardActionCreator(leaderboard));
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  ActionType,
  receiveLeaderboardActionCreator,
  asyncPopulateLeaderboard,
};