import api from '../../utils/api.js';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_UPVOTE_THREAD: 'TOGGLE_UPVOTE_THREAD',
  TOGGLE_DOWNVOTE_THREAD: 'TOGGLE_DOWNVOTE_THREAD',
  TOGGLE_NEUTRALIZEVOTE_THREAD: 'TOGGLE_NEUTRALIZEVOTE_THREAD',
  TOGGLE_UPVOTE_COMMENT: 'TOGGLE_UPVOTE_COMMENT',
  TOGGLE_DOWNVOTE_COMMENT: 'TOGGLE_DOWNVOTE_COMMENT',
  TOGGLE_NEUTRALIZEVOTE_COMMENT: 'TOGGLE_NEUTRALIZEVOTE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function toggleUpVoteThreadActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_UPVOTE_THREAD,
    payload: {
      userId,
    },
  };
}

function toggleDownVoteThreadActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_THREAD,
    payload: {
      userId,
    },
  };
}

function toggleNeutralizeVoteThreadActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_NEUTRALIZEVOTE_THREAD,
    payload: {
      userId,
    },
  };
}

function toggleUpVoteCommentActionCreator(userId, commentId) {
  return {
    type: ActionType.TOGGLE_UPVOTE_COMMENT,
    payload: {
      userId,
      commentId,
    },
  };
}

function toggleDownVoteCommentActionCreator(userId, commentId) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_COMMENT,
    payload: {
      userId,
      commentId,
    },
  };
}

function toggleNeutralizeVoteCommentActionCreator(userId, commentId) {
  return {
    type: ActionType.TOGGLE_NEUTRALIZEVOTE_COMMENT,
    payload: {
      userId,
      commentId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncAddComment(threadId, content) {
  return async (dispatch) => {
    try {
      const newComment = await api.createComment(threadId, content);
      dispatch(addCommentActionCreator(newComment));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToggleUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleUpVoteThreadActionCreator(authUser.id));

    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleNeutralizeVoteThreadActionCreator(authUser.id));
    }
  };
}

function asyncToggleDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleDownVoteThreadActionCreator(authUser.id));

    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleNeutralizeVoteThreadActionCreator(authUser.id));
    }
  };
}

function asyncToggleNeutralizeVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleNeutralizeVoteThreadActionCreator(authUser.id));

    try {
      await api.neutralizeVoteThread(threadId);
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToggleUpVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleUpVoteCommentActionCreator(authUser.id, commentId));

    try {
      await api.upVoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleNeutralizeVoteCommentActionCreator(authUser.id, commentId));
    }
  };
}

function asyncToggleDownVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleDownVoteCommentActionCreator(authUser.id, commentId));

    try {
      await api.downVoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleNeutralizeVoteCommentActionCreator(authUser.id, commentId));
    }
  };
}

function asyncToggleNeutralizeVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleNeutralizeVoteCommentActionCreator(authUser.id, commentId));

    try {
      await api.neutralizeVoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  addCommentActionCreator,
  toggleUpVoteThreadActionCreator,
  toggleDownVoteThreadActionCreator,
  toggleNeutralizeVoteThreadActionCreator,
  toggleUpVoteCommentActionCreator,
  toggleDownVoteCommentActionCreator,
  toggleNeutralizeVoteCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
  asyncToggleNeutralizeVoteThread,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
  asyncToggleNeutralizeVoteComment,
};