import { ActionType } from "./action";

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.ADD_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.concat(action.payload.comment),
      };
    case ActionType.TOGGLE_UPVOTE_THREAD:
      return {
        ...threadDetail,
        upVotesBy: [...threadDetail.upVotesBy, action.payload.userId],
        downVotesBy: threadDetail.downVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
      };
    case ActionType.TOGGLE_DOWNVOTE_THREAD:
      return {
        ...threadDetail,
        downVotesBy: [...threadDetail.downVotesBy, action.payload.userId],
        upVotesBy: threadDetail.upVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
      };
    case ActionType.TOGGLE_NEUTRALIZEVOTE_THREAD:
      return {
        ...threadDetail,
        downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId)
          ? threadDetail.downVotesBy.filter(
              (id) => id !== action.payload.userId,
            )
          : threadDetail.downVotesBy,
        upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId)
          ? threadDetail.upVotesBy.filter((id) => id !== action.payload.userId)
          : threadDetail.upVotesBy,
      };
    case ActionType.TOGGLE_UPVOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            const newUpVotesBy = [...comment.upVotesBy, action.payload.userId];

            const newDownVotesBy = comment.downVotesBy.filter(
              (id) => id !== action.payload.userId,
            );

            return {
              ...comment,
              upVotesBy: newUpVotesBy,
              downVotesBy: newDownVotesBy,
            };
          }

          return comment;
        }),
      };
    case ActionType.TOGGLE_DOWNVOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            const newUpVotesBy = comment.upVotesBy.filter(
              (id) => id !== action.payload.userId,
            );

            const newDownVotesBy = [...comment.downVotesBy, action.payload.userId];

            return {
              ...comment,
              upVotesBy: newUpVotesBy,
              downVotesBy: newDownVotesBy,
            };
          }

          return comment;
        }),
      };
    case ActionType.TOGGLE_NEUTRALIZEVOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            const newUpVotesBy = comment.upVotesBy.includes(
              action.payload.userId,
            )
              ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
              : comment.upVotesBy;

            const newDownVotesBy = comment.downVotesBy.includes(
              action.payload.userId,
            )
              ? comment.downVotesBy.filter((id) => id !== action.payload.userId)
              : comment.downVotesBy;

            return {
              ...comment,
              upVotesBy: newUpVotesBy,
              downVotesBy: newDownVotesBy,
            };
          }

          return comment;
        }),
      };
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
