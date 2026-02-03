import React from 'react';
import {Link} from "react-router";
import {MessageSquare} from "lucide-react";
import {FaRegThumbsDown, FaRegThumbsUp} from "react-icons/fa";
import {showFormattedDate} from "../utils/index.js";

function ThreadItem({ thread }) {
    return (
        <Link to={`/threads/${thread?.id}`}>
            <div key={thread?.id} data-id="element-176" style={{opacity: 1, transform: "none"}}>
                <div
                    className="group relative bg-white rounded-xl p-0 shadow-sm hover:shadow-md transition-shadow border border-slate-100 overflow-hidden"
                    data-id="element-95" style={{opacity: 1, transform: "none"}}>
                    <div className="flex" data-id="element-96">
                        <div className="flex-1 p-5" data-id="element-99">
                            <div className="flex items-start justify-between mb-2" data-id="element-100">
                                <div className="flex items-center space-x-2 text-xs text-slate-500"
                                     data-id="element-101"><img
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                                    alt="Alex Rivera" className="w-5 h-5 rounded-full" data-id="element-102"/><span
                                    className="font-medium text-slate-700" data-id="element-103">{thread.owner?.name}</span><span
                                    data-id="element-104">•</span><span className="flex items-center"
                                                                        data-id="element-105"><svg
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round" className="lucide lucide-clock w-3 h-3 mr-1"
                                    aria-hidden="true" data-id="element-106"><circle cx="12" cy="12" r="10"></circle><polyline
                                    points="12 6 12 12 16 14"></polyline></svg>{showFormattedDate(thread?.createdAt)}</span></div>
                                <div className="flex space-x-2" data-id="element-107">
                                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] uppercase font-bold tracking-wider rounded-full" data-id="element-108">{thread?.category}</span>
                                </div>
                            </div>
                            <div className="block group-hover:text-blue-600 transition-colors" data-id="element-109">
                                <h3 className="text-lg font-semibold text-slate-900 mb-2 leading-tight" data-id="element-110">{thread?.title}</h3>
                                <p className="text-slate-500 text-sm line-clamp-2 mb-4" data-id="element-111">{thread?.body}</p>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-slate-50 mt-2" data-id="element-112">
                                <div className="flex items-center space-x-4" data-id="element-113">
                                    <button className="flex items-center gap-1 text-slate-500">
                                        <FaRegThumbsUp />
                                        <span>{thread?.upVotesBy.length}</span>
                                    </button>
                                    <button className="flex items-center gap-1 text-slate-500">
                                        <FaRegThumbsDown />
                                        <span>{thread?.downVotesBy.length}</span>
                                    </button>
                                    <div className="flex items-center space-x-1.5 text-slate-500 hover:text-blue-600 transition-colors text-sm group/comments" data-id="element-114" href="/thread/1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round"
                                             className="lucide lucide-message-circle w-4 h-4 group-hover/comments:fill-blue-50"
                                             aria-hidden="true" data-id="element-115">
                                            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                                        </svg>
                                        <span data-id="element-116">{thread?.totalComments} comments</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ThreadItem;