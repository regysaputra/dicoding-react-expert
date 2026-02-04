import React from 'react';
import ThreadItem from './ThreadItem.jsx';
import Joi from 'joi';
import { validateProps } from '../utils/index.js';

const threadListPropsSchema = Joi.object({
  threads: Joi.array().items(Joi.object({
    id: Joi.number().required(),
    title: Joi.string().required(),
    body: Joi.string().required(),
    createdAt: Joi.string().required(),
    category: Joi.string().required(),
    owner: Joi.object({
      id: Joi.number().required(),
      name: Joi.string().required(),
    }),
    upVotesBy: Joi.array().items(Joi.object({
      id: Joi.number().required(),
    })),
    downVotesBy: Joi.array().items(Joi.object({
      id: Joi.number().required(),
    })),
    totalComments: Joi.number().required(),
  }))
});

function ThreadList(props) {
  const { threads } = validateProps(threadListPropsSchema, props, 'ThreadList');

  return (
    <div className='grid grid-cols-2 gap-6'>
      {threads.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </div>
  );
}

export default ThreadList;