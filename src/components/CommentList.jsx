import Comment from "./Comment.jsx";
import React from "react";

export default function CommentList(props) {
  return (
    <div className="space-y-4" data-id="element-313">
      {props.threadDetail?.comments.map((comment) => (
        <Comment
          key={comment.id}
          userId={props.userId}
          threadId={props.threadId}
          comment={comment}
        />
      ))}
    </div>
  );
}