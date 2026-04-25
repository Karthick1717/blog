import { useState } from "react";

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);

  const handleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div
      className="p-5 transition transform bg-white border dark:bg-gray-800 rounded-2xl shadow-soft border-brand-200 dark:border-gray-700 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Title */}
      <h2 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-100">
        {post.title}
      </h2>

      {/* Meta Info */}
      <div className="flex items-center justify-between mb-3 text-sm text-gray-500 dark:text-gray-400">
        <span>{post.author}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Content Preview */}
      <p className="mb-4 text-gray-600 dark:text-gray-300 line-clamp-3">
        {post.content}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        
        {/* Tags */}
        <span className="px-2 py-1 text-xs rounded-md bg-brand-200 text-brand-700">
          {post.tag || "General"}
        </span>

        {/* Like Button */}
        <button
          onClick={handleLike}
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
  );
};

export default PostCard;