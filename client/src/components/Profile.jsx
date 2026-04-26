import { useEffect, useState } from "react";
import API from "../services/api";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("api//users/profile").then((res) => setUser(res.data));
  }, []);

  if (!user) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-4xl p-4 mx-auto">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-soft">
        <h2 className="text-2xl font-semibold text-brand-500">
          {user.username}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
      </div>
    </div>
  );
};

export default Profile;