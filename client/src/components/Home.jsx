import PostCard from "../components/PostCard";
const demoPost = {
  title: "Building a Modern Blog App",
  author: "You",
  content: "This is a sample post content to preview how the card looks...",
  createdAt: new Date(),
  likes: 10,
  tag: "Tech",
};
const Home = () => {
  return (
    <div className="grid max-w-6xl gap-6 p-4 mx-auto md:grid-cols-2 lg:grid-cols-3">
      <PostCard post={demoPost} />
    </div>
  );
};

export default Home;