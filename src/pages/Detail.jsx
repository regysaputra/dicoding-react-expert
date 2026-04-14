import React from "react";
import { useNavigate, useParams } from "react-router";
import {
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
import { showFormattedDate } from "../utils/index.js";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncAddComment,
  asyncReceiveThreadDetail,
  asyncToggleDownVoteThread,
  asyncToggleNeutralizeVoteThread,
  asyncToggleUpVoteThread,
} from "../states/threadDetail/action.js";
import useInput from "../hooks/useInput.jsx";
import CommentList from "../components/CommentList.jsx";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const threadDetail = useSelector((state) => state.threadDetail);
  const [content, handleContent, resetContent] = useInput("");
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  function handleBackToPrevious() {
    navigate(-1);
  }

  function handleUpVote() {
    if (authUser) {
      if (threadDetail?.upVotesBy.includes(authUser?.id)) {
        dispatch(asyncToggleNeutralizeVoteThread(id));
      } else {
        dispatch(asyncToggleUpVoteThread(id));
      }
    }
  }

  function handleDownVote() {
    if (authUser) {
      if (threadDetail?.downVotesBy.includes(authUser?.id)) {
        dispatch(asyncToggleNeutralizeVoteThread(id));
      } else {
        dispatch(asyncToggleDownVoteThread(id));
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(asyncAddComment(id, content));

    resetContent("");
  }

  if (!threadDetail) {
    return <div>Loading...</div>;
  }

  console.log("isInclude :", threadDetail?.upVotesBy.includes(authUser?.id))

  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      <button
        onClick={handleBackToPrevious}
        className="flex items-center gap-2 bg-transparent border-none p-0 text-gray-600 hover:text-gray-900 underline-offset-4 hover:underline cursor-pointer mb-2"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
        <span>Back to discussions</span>
      </button>

      <div
        className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8"
        data-id="element-291"
        style={{ opacity: 1, transform: "none" }}
      >
        <div className="flex" data-id="element-292">
          <div className="flex-1 p-6 md:p-8" data-id="element-295">
            <div
              className="flex items-center space-x-3 mb-6"
              data-id="element-296"
            >
              <img
                src={threadDetail?.owner.avatar}
                alt="Jordan Smith"
                className="w-10 h-10 rounded-full border border-slate-100"
                data-id="element-297"
              />
              <div data-id="element-298">
                <h1
                  className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight"
                  data-id="element-299"
                >
                  {threadDetail?.title}
                </h1>
                <div
                  className="flex items-center space-x-2 text-sm text-slate-500 mt-1"
                  data-id="element-300"
                >
                  <span
                    className="font-medium text-slate-700"
                    data-id="element-301"
                  >
                    {threadDetail?.owner.name}
                  </span>
                  <span data-id="element-302">•</span>
                  <span data-id="element-303">
                    {showFormattedDate(threadDetail?.createdAt)}
                  </span>
                </div>
              </div>
            </div>
            <div
              className="prose prose-slate max-w-none mb-8"
              data-id="element-304"
            >
              <p
                className="text-lg text-slate-800 leading-relaxed"
                data-id="element-305"
              >
                {threadDetail?.body}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mb-8" data-id="element-306">
              <span
                className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-full"
                data-id="element-307"
              >
                {threadDetail?.category}
              </span>
            </div>
            <div
              className="flex items-center justify-between pt-6 border-t border-slate-100"
              data-id="element-308"
            >
              <div
                className="flex items-center space-x-6"
                data-id="element-309"
              >
                <button
                  data-cy="thread-upvote-button"
                  data-voted={threadDetail?.upVotesBy.includes(authUser?.id) ? "true" : "false"}
                  onClick={handleUpVote}
                  className="flex items-center space-x-2 text-slate-500 hover:text-blue-600 transition-colors"
                  data-id="element-310"
                >
                  {threadDetail?.upVotesBy.includes(authUser?.id) ? (
                    <FaThumbsUp className="w-5 h-5" />
                  ) : (
                    <FaRegThumbsUp className="w-5 h-5" />
                  )}
                  <span data-cy="thread-upvote-count" className="font-medium" data-id="element-312">
                    {threadDetail?.upVotesBy.length}
                  </span>
                </button>
                <button
                  data-cy="thread-downvote-button"
                  data-voted={threadDetail?.downVotesBy.includes(authUser?.id) ? "true" : "false"}
                  onClick={handleDownVote}
                  className="flex items-center space-x-2 text-slate-500 hover:text-blue-600 transition-colors"
                  data-id="element-310"
                >
                  {threadDetail?.downVotesBy.includes(authUser?.id) ? (
                    <FaThumbsDown className="w-5 h-5" />
                  ) : (
                    <FaRegThumbsDown className="w-5 h-5" />
                  )}
                  <span data-cy="thread-downvote-count" className="font-medium" data-id="element-312">
                    {threadDetail?.downVotesBy.length}
                  </span>
                </button>
                <button
                  className="flex items-center space-x-2 text-slate-500 hover:text-blue-600 transition-colors"
                  data-id="element-310"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-message-circle w-5 h-5"
                    aria-hidden="true"
                    data-id="element-311"
                  >
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                  </svg>
                  <span className="font-medium" data-id="element-312">
                    {threadDetail?.comments.length} Comments
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-4">
        {threadDetail?.comments.length} Comments
      </h2>
      { authUser && (
        <div className="mb-6">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6"
          >
            <textarea
              data-cy="comment-content-input"
              value={content}
              onChange={handleContent}
              placeholder="What are your thoughts?"
              className="w-full min-h-32 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            ></textarea>
            <div className="flex justify-end mt-3">
              <button
                data-cy="comment-submit-button"
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
              >
                Post Comment
              </button>
            </div>
          </form>

        </div>
      ) }

      <CommentList threadId={id} userId={authUser?.id} threadDetail={threadDetail} />
    </main>
  );
}

export default DetailPage;
