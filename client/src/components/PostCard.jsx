import { useState } from "react";
import CommentSection from "./CommentSection";
import API from "../services/api";

const PostCard = ({ post }) => {
  const [likes, setLikes] = useState(post.likedBy?.length || 0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const res = await API.post(`/api/likes/${post.id}`);
      const message = res.data.message;

      // ✅ Decide based on backend response
      if (message === "LIKED") {
        setLiked(true);
        setLikes((prev) => prev + 1);
      } else if (message === "UNLIKED") {
        setLiked(false);
        setLikes((prev) => Math.max(prev - 1, 0));
      }

    } catch (err) {
      console.error("Like error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 transition bg-white border dark:bg-gray-800 rounded-2xl shadow-soft border-brand-200 dark:border-gray-700 hover:shadow-lg">
      
      {/* 🖼️ Image */}
      {post.image && (
        <div className="mb-5 overflow-hidden rounded-xl">
     <img
  src={post.image}
  alt="post"
  className="object-cover w-full h-60 md:h-64 lg:h-72 rounded-xl"
/>
        </div>
      )}

      {/* 📄 Content */}
      <div className="flex flex-col justify-between">
        
        <div>
          {/* Title */}
          <h2 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-100">
            {post.title}
          </h2>

          {/* Meta */}
          <div className="flex items-center justify-between mb-3 text-sm text-gray-500 dark:text-gray-400">
            <span><b>Author:</b>:{post.author?.username}</span>
            <span>
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Content */}
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            {post.content}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="px-2 py-1 text-xs rounded-md bg-brand-200 text-brand-700">
            {post.tag || "General"}
          </span>

          <button
            onClick={handleLike}
            disabled={loading}
            className={`flex items-center gap-1 px-3 py-1 rounded-md transition 
              ${
                liked
                  ? "bg-brand-500 text-white scale-105"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              }`}
          >
            ❤️ {likes}
          </button>
        </div>
      </div>

      {/* 💬 Comments */}
      <CommentSection postId={post.id} />
    </div>
  );
};

export default PostCard;