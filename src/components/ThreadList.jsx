import React from 'react';
import ThreadItem from "./ThreadItem.jsx";

function ThreadList({ threads }) {
    return (
        <div className="grid grid-cols-2 gap-6">
            {threads.map((thread) => (
                <ThreadItem key={thread.id} thread={thread} />
            ))}
        </div>
    );
}

export default ThreadList;