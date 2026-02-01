import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
    switch (action.type) {
        case ActionType.RECEIVE_THREAD_DETAIL:
            return action.payload.talkDetail;
        case ActionType.CLEAR_TALK_DETAIL:
            return null;
        case ActionType.TOGGLE_UPVOTE_THREAD:
            return  {
                ...threadDetail,
                upVotesBy: threadDetail.upVotesBy.concat([action.payload.userId]),
            };
        case ActionType.TOGGLE_DOWNVOTE_THREAD:
            return  {
                ...threadDetail,
                downVotesBy: threadDetail.downVotesBy.concat([action.payload.userId]),
            };
        case ActionType.TOGGLE_NEUTRALIZEVOTE_THREAD:
            return {
                ...threadDetail,
                downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId)
                    ? threadDetail.downVotesBy.filter((id) => id !== action.payload.userId)
                    : threadDetail.downVotesBy,
                upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId)
                    ? threadDetail.upVotesBy.filter((id) => id !== action.payload.userId)
                    : threadDetail.upVotesBy,
            };
        default:
            return threadDetail;
    }
}

export default threadDetailReducer;