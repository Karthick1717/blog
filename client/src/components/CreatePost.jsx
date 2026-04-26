import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // 📸 handle image select
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // ☁️ upload to cloudinary
  const uploadImage = async () => {
    if (!image) return null;

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "blog");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dxi88zu70 /image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();
      return result.secure_url; // ✅ global image URL
    } catch (err) {
      console.error("Image upload error", err);
      return null;
    }
  };

  // 📝 submit post
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.content) {
      alert("Title and content required");
      return;
    }

    try {
      setLoading(true);

      const imageUrl = await uploadImage();

      await API.post("/posts", {
        title: form.title,
        content: form.content,
        image: imageUrl,
      });

      navigate("/"); // go home after post
    } catch (err) {
      console.error("Post error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl p-4 mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-center">
        ✨ Create New Post
      </h1>

      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-5 bg-white dark:bg-gray-800 rounded-2xl shadow-soft"
      >
        {/* Title */}
        <input
          type="text"
          placeholder="Enter post title..."
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="w-full p-3 border rounded-md dark:bg-gray-700"
        />

        {/* Content */}
        <textarea
          placeholder="Write your content..."
          rows="5"
          value={form.content}
          onChange={(e) =>
            setForm({ ...form, content: e.target.value })
          }
          className="w-full p-3 border rounded-md dark:bg-gray-700"
        />

        {/* Image Upload */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Upload Image
          </label>

          <input type="file" onChange={handleImageChange} />

          {/* Preview */}
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="object-cover w-full h-48 mt-3 rounded-xl"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 text-white transition rounded-md bg-brand-500 hover:bg-brand-600 disabled:opacity-50"
        >
          {loading ? "Posting..." : "🚀 Publish Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;