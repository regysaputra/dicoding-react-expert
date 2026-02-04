import React from 'react';
import { FaRegThumbsDown, FaRegThumbsUp, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { showFormattedDate, validateProps } from '../utils/index.js';
import { useDispatch } from 'react-redux';
import {
  asyncToggleDownVoteComment,
  asyncToggleNeutralizeVoteComment,
  asyncToggleUpVoteComment
} from '../states/threadDetail/action.js';
import Joi from 'joi';

const commentPropsSchema = Joi.object({
  userId: Joi.string().required(),
  threadId: Joi.string().required(),
  comment: Joi.object({
    id: Joi.string().required(),
    content: Joi.string().min(1).required(),
    createdAt: Joi.date().required(),
    owner: Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      avatar: Joi.string().uri().required()
    }).required(),
    upVotesBy: Joi.array().items(Joi.string()).required(),
    downVotesBy: Joi.array().items(Joi.string()).required()
  })
});

function Comment(props) {
  const { userId, threadId, comment } = validateProps(commentPropsSchema, props, 'Comment');

  const dispatch = useDispatch();

  function handleUpVote() {
    if (comment.upVotesBy.includes(userId)) {
      dispatch(asyncToggleNeutralizeVoteComment(threadId, comment.id));
    } else {
      dispatch(asyncToggleUpVoteComment(threadId, comment.id));
    }
  }

  function handleDownVote() {
    if (comment.downVotesBy.includes(userId)) {
      dispatch(asyncToggleNeutralizeVoteComment(threadId, comment.id));
    } else {
      dispatch(asyncToggleDownVoteComment(threadId, comment.id));
    }
  }

  return (
    <div className='space-y-6'>
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
        <div className='flex gap-3'>
          <img src={comment.owner.avatar} alt='Sarah Chen' className='w-10 h-10 rounded-full'/>
          <div className='flex-1'>
            <div className='flex items-center justify-between mb-2'>
              <div className='flex items-center gap-2 text-sm'>
                <span className='font-semibold'>{comment.owner.name}</span>
                <span className='text-gray-400'>•</span>
                <span className='text-gray-500'>{showFormattedDate(comment.createdAt)}</span>
              </div>
            </div>
            <p className='text-gray-700 mb-3'>
              {comment.content}
            </p>
            <div className='flex items-center gap-4'>
              <button onClick={handleUpVote} className='flex items-center gap-1 text-slate-500'>
                {
                  comment.upVotesBy.includes(userId) ? <FaThumbsUp /> : <FaRegThumbsUp />
                }
                <span>{comment.upVotesBy.length}</span>
              </button>
              <button onClick={handleDownVote} className='flex items-center gap-1 text-slate-500'>
                {
                  comment.downVotesBy.includes(userId) ? <FaThumbsDown /> : <FaRegThumbsDown />
                }
                <span>{comment.downVotesBy.length}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;