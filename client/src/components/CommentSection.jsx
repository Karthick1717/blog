import { useState} from "react";
import API from "../services/api";

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

//   // ✅ memoized function (prevents re-creation every render)
//   const fetchComments = useCallback(async () => {
//     try {
//       const res = await API.get(`/comments/${postId}`);
//       setComments(res.data);
//     } catch (err) {
//       console.error("Error fetching comments", err);
//     }
//   }, [postId]);

//   useEffect(() => {
//     if (!postId) return; // ✅ safety check
//     fetchComments();
//   }, [fetchComments]);

  const addComment = async () => {
    if (!text.trim()) return;

    try {
      await API.post(`/comments/${postId}`, { content: text });

      // ✅ Optimistic update (better UX + avoids extra effect loops)
      setComments((prev) => [
        ...prev,
        {
          id: Date.now(),
          author: "You",
          content: text,
        },
      ]);

      setText("");
    } catch (err) {
      console.error("Error adding comment", err);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="mb-3 text-lg font-semibold">Comments</h3>

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

      <div className="space-y-3">
        {comments.map((c) => (
          <div
            key={c.id}
            className="p-3 bg-white rounded-md dark:bg-gray-800 shadow-soft"
          >
            <p className="text-sm font-semibold">{c.author}</p>
            <p className="text-gray-600 dark:text-gray-300">{c.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;