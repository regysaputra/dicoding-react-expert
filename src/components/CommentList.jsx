import Comment from "./Comment.jsx";
import React from "react";
import Joi from "joi";
import { validateProps } from "../utils/index.js";

// Schema for CommentList component
const commentListPropsSchema = Joi.object({
  threadDetail: Joi.object({
    comments: Joi.array().items(
      Joi.object({
        id: Joi.string().required(),
        content: Joi.string().min(1).required(),
        createdAt: Joi.date().required(),
        owner: Joi.object({
          id: Joi.string().required(),
          name: Joi.string().required(),
          avatar: Joi.string().uri().required(),
        }),
      }),
    ),
  }),
  userId: Joi.string().required(),
});

export default function CommentList(props) {
  const { threadDetail, userId } = validateProps(
    commentListPropsSchema,
    props,
    "CommentList",
  );

  return (
    <div className="space-y-4" data-id="element-313">
      {threadDetail?.comments.map((comment) => (
        <Comment
          key={comment.id}
          userId={userId}
          threadId={threadDetail.id}
          comment={comment}
        />
      ))}
    </div>
  );
}
