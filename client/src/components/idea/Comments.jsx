import React, { useState } from 'react'
import {ideaService} from "@services";

function Comments({ideaId, comments, setComments}) {
 
    const [commentText, setCommentText] = useState("");

    const handleComment = async () => {
        if (!commentText.trim()) return;
        try {
            const data = await ideaService.commentIdea(ideaId, commentText);
            setComments(data);
            setCommentText("");
        } catch (error) {
            console.error("Failed to comment:", error);
        }
    };

    return (
        <>
            <div className="mt-3">
                <input
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring focus:ring-indigo-400"
                />
                <button
                    onClick={handleComment}
                    className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
                >
                    Comment
                </button>
            </div>
 
            {comments.length > 0 && (
                <div className="mt-3 space-y-2">
                    {comments.map((c, i) => (
                        <p key={i} className="text-sm text-gray-700">
                            <span className="font-semibold">{c.user?.username || "User"}: </span>
                            {c.text}
                        </p>
                    ))}
                </div>
            )}
        </>
    )
}

export default Comments