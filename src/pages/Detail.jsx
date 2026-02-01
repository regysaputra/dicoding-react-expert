import React from 'react';
import {useNavigate, useParams} from "react-router";
import {FaRegThumbsDown, FaRegThumbsUp, FaThumbsUp} from "react-icons/fa";
import Comment from "../components/Comment.jsx";
import {showFormattedDate} from "../utils/index.js";

function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const thread = {
        id: "thread-1",
        title: "Thread Pertama",
        body: "Ini adalah thread pertama",
        category: "Programming",
        createdAt: "2021-06-21T07:00:00.000Z",
        owner: {
            id: "users-1",
            name: "John Doe",
            avatar: "https://generated-image-url.jpg"
        },
        upVotesBy: ["user-2", "user-5"],
        downVotesBy: ["user-1"],
        comments: [
            {
                id: "comment-1",
                content: "Ini adalah komentar pertama",
                createdAt: "2021-06-21T07:00:00.000Z",
                owner: {
                    id: "users-1",
                    name: "John Doe",
                    avatar: "https://generated-image-url.jpg"
                },
                upVotesBy: ["user-2", "user-5"],
                downVotesBy: ["user-1"]
            }
        ]
    };

    function handleBackToPrevious() {
        navigate(-1);
    }

    return (
        <main className="max-w-4xl mx-auto px-6 py-8 mt-16">
            <button
                onClick={handleBackToPrevious}
                className="flex items-center gap-2 bg-transparent border-none p-0 text-gray-600 hover:text-gray-900 underline-offset-4 hover:underline cursor-pointer mb-2"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                <span>Back to discussions</span>
            </button>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8" data-id="element-291" style={{opacity: 1, transform: "none"}}>
                <div className="flex" data-id="element-292">
                    <div className="flex-1 p-6 md:p-8" data-id="element-295">
                        <div className="flex items-center space-x-3 mb-6" data-id="element-296">
                            <img src={thread.owner.avatar} alt="Jordan Smith" className="w-10 h-10 rounded-full border border-slate-100" data-id="element-297"/>
                            <div data-id="element-298">
                                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight" data-id="element-299">{thread.title}</h1>
                                <div className="flex items-center space-x-2 text-sm text-slate-500 mt-1" data-id="element-300">
                                    <span className="font-medium text-slate-700" data-id="element-301">{thread.owner.name}</span>
                                    <span data-id="element-302">•</span><span data-id="element-303">{showFormattedDate(thread.createdAt)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="prose prose-slate max-w-none mb-8" data-id="element-304">
                            <p className="text-lg text-slate-800 leading-relaxed" data-id="element-305">{thread.body}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-8" data-id="element-306">
                            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-full" data-id="element-307">{thread.category}</span>
                        </div>
                        <div className="flex items-center justify-between pt-6 border-t border-slate-100" data-id="element-308">
                            <div className="flex items-center space-x-6" data-id="element-309">
                                <button className="flex items-center space-x-2 text-slate-500 hover:text-blue-600 transition-colors" data-id="element-310">
                                    <FaRegThumbsUp className="w-5 h-5" />
                                    <span className="font-medium" data-id="element-312">{thread.upVotesBy.length}</span>
                                </button>
                                <button className="flex items-center space-x-2 text-slate-500 hover:text-blue-600 transition-colors" data-id="element-310">
                                    <FaRegThumbsDown className="w-5 h-5" />
                                    <span className="font-medium" data-id="element-312">{thread.downVotesBy.length}</span>
                                </button>
                                <button className="flex items-center space-x-2 text-slate-500 hover:text-blue-600 transition-colors" data-id="element-310">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle w-5 h-5" aria-hidden="true" data-id="element-311">
                                        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                                    </svg>
                                    <span className="font-medium" data-id="element-312">{thread.comments.length} Comments</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">{thread.comments.length} Comments</h2>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <textarea
                    placeholder="What are your thoughts?"
                    className="w-full min-h-32 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                ></textarea>
                    <div className="flex justify-end mt-3">
                        <button
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">
                            Post Comment
                        </button>
                    </div>
                </div>
                {
                    thread.comments.map(comment => <Comment key={comment.id} comment={comment}/>)
                }
            </div>
        </main>
    );
}

export default DetailPage;