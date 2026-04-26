import { useEffect, useState } from "react";
import API from "../services/api";
import axios from "axios";


const Profile = () => {
  const [user, setUser] = useState(false);
  
  async function getProfile(){
     const token=localStorage.getItem("token");
    const response=await axios.get("http://localhost:8080/api/auth/profile",{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    console.log(response);
  }
   
  useEffect(()=>{
    getProfile()
  },[])

  if(!user) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-4xl p-4 mx-auto">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-soft">
        <h2 className="text-2xl font-semibold text-brand-500">
          {user.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
      </div>
    </div>
  );
};

export default Profile;