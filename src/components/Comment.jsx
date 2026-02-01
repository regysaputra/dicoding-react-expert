import React from 'react';
import {FaRegThumbsDown, FaRegThumbsUp} from "react-icons/fa";
import {showFormattedDate} from "../utils/index.js";

function Comment({ comment }) {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex gap-3">
                    <img src={comment.owner.avatar} alt="Sarah Chen" className="w-10 h-10 rounded-full"/>
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="font-semibold">{comment.owner.name}</span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-500">{showFormattedDate(comment.createdAt)}</span>
                            </div>
                        </div>
                        <p className="text-gray-700 mb-3">
                            {comment.content}
                        </p>
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1 text-slate-500">
                                <FaRegThumbsUp />
                                <span>{comment.upVotesBy.length}</span>
                            </button>
                            <button className="flex items-center gap-1 text-slate-500">
                                <FaRegThumbsDown />
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