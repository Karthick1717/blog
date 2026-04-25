import { useState } from "react";
import CommentSection from "./CommentSection";

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likedBy?.length || 0);

  const handleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="p-5 transition bg-white border dark:bg-gray-800 rounded-2xl shadow-soft border-brand-200 dark:border-gray-700 hover:shadow-lg">
      
      {/* 🔥 BIG RESPONSIVE IMAGE */}
      {post.image && (
        <div className="mb-5 overflow-hidden rounded-xl">
        <img
  src={post.image}
  alt="post"
  className="object-cover w-full h-56 transition sm:h-64 md:h-72 lg:h-80 rounded-xl hover:scale-105"
/>
        </div>
      )}

      {/* 📄 CONTENT */}
      <div className="flex flex-col justify-between">
        
        <div>
          {/* Title */}
          <h2 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-100">
            {post.title}
          </h2>

          {/* Meta */}
          <div className="flex items-center justify-between mb-3 text-sm text-gray-500 dark:text-gray-400">
            <span>{post.author?.username}</span>
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

      {/* 💬 COMMENTS */}
      <CommentSection postId={post.id} />
    </div>
  );
};

export default PostCard;