import { useState, useEffect, useCallback } from "react";
import API from "../services/api";

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  // Fetch comments
  const fetchComments = useCallback(async () => {
    try {
      const res = await API.get(`/api/comments/${postId}`);
      setComments(res.data.data);
    } catch (err) {
      console.error("Error fetching comments", err);
    }
  }, [postId]);

  useEffect(() => {
    if (!postId) return;
    fetchComments();
  }, [fetchComments]);

  // Add comment
  const addComment = async () => {
    if (!text.trim()) return;

    try {
      await API.post(`/api/comments/${postId}`, { content: text });

      // Optimistic update
      setComments((prev) => [
        ...prev,
        {
          id: Date.now(),
          content: text,
        },
      ]);
      fetchComments();
      setText("");
    } catch (err) {
      console.error("Error adding comment", err);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="mb-3 text-lg font-semibold">Comments</h3>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 p-2 border rounded-md dark:bg-gray-700"
        />
        <button
          onClick={addComment}
          className="px-4 text-white rounded-md bg-brand-500"
        >
          Post
        </button>
      </div>

      {/* 🔥 Fixed Height + Scroll */}
      <div className="pr-1 space-y-3 overflow-y-auto max-h-60 md:max-h-72">
        {comments.length > 0 ? (
          comments.map((c) => (
            <div
              key={c.id}
              className="p-3 bg-white rounded-md dark:bg-gray-800 shadow-soft"
            >
              <p className="text-sm font-semibold">
                {c?.user?.username || "User"}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {c.content}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No comments yet</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;