import { useEffect, useState } from "react";
import API from "../services/api";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPosts(res.data.data);
      } catch (err) {
        console.error("Error fetching posts", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-5xl p-4 mx-auto space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Home;