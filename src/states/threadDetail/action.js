import api from "../../utils/api.js";

const ActionType = {
    RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
    TOGGLE_UPVOTE_THREAD: 'TOGGLE_UPVOTE_THREAD',
    TOGGLE_DOWNVOTE_THREAD: 'TOGGLE_DOWNVOTE_THREAD',
    TOGGLE_NEUTRALIZEVOTE_THREAD: 'TOGGLE_NEUTRALIZEVOTE_THREAD',
};

function receiveThreadDetailActionCreator(threadDetail) {
    return {
        type: ActionType.RECEIVE_THREAD_DETAIL,
        payload: {
            threadDetail,
        },
    };
}

function toggleUpVoteThreadActionCreator({ threadId }) {
    return {
        type: ActionType.TOGGLE_UPVOTE_THREAD,
        payload: {
            threadId,
        },
    };
}

function toggleDownVoteThreadActionCreator({ threadId }) {
    return {
        type: ActionType.TOGGLE_DOWNVOTE_THREAD,
        payload: {
            threadId,
        },
    };
}

function toggleNeutralizeVoteThreadActionCreator({ threadId }) {
    return {
        type: ActionType.TOGGLE_NEUTRALIZEVOTE_THREAD,
        payload: {
            threadId,
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

function asyncToggleUpVoteThread(threadId) {
    return async (dispatch, getState) => {
        const { authUser } = getState();
        dispatch(toggleUpVoteThreadActionCreator({ threadId }));

        try {
            await api.upVoteThread(threadId);
        } catch (error) {
            alert(error.message);
            dispatch(toggleNeutralizeVoteThreadActionCreator({ threadId }));
        }
    };
}

function asyncToggleDownVoteThread(threadId) {
    return async (dispatch, getState) => {
        const { authUser } = getState();
        dispatch(toggleDownVoteThreadActionCreator({ threadId }));

        try {
            await api.downVoteThread(threadId);
        } catch (error) {
            alert(error.message);
            dispatch(toggleNeutralizeVoteThreadActionCreator({ threadId }));
        }
    };
}

function asyncToggleNeutralizeVoteThread(threadId) {
    return async (dispatch, getState) => {
        const { authUser } = getState();
        dispatch(toggleNeutralizeVoteThreadActionCreator({ threadId }));

        try {
            await api.neutralizeVoteThread(threadId);
        } catch (error) {
            alert(error.message);
            dispatch(toggleNeutralizeVoteThreadActionCreator({ threadId }));
        }
    };
}

export {
    ActionType,
    receiveThreadDetailActionCreator,
    toggleUpVoteThreadActionCreator,
    toggleDownVoteThreadActionCreator,
    toggleNeutralizeVoteThreadActionCreator,
    asyncReceiveThreadDetail,
    asyncToggleUpVoteThread,
    asyncToggleDownVoteThread,
    asyncToggleNeutralizeVoteThread,
};