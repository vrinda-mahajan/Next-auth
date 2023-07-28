"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>();

  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };
  const getUserData = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log(response.data);
      setUser(response.data.user)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    getUserData();
  },[])
  return (
    <div className="py-8 flex flex-col justify-center items-center min-h-screen gap-3">
      <h2>User Profile</h2>
      <div>Username: {user?<Link className="underline" href={`/profile/${user._id}`}>{user.username}</Link>: "Loading user..."}</div>
      <button
        onClick={onLogout}
        className="px-2 py-1 bg-red-500 text-slate-50 rounded-md hover:text-slate-200"
      >
        Logout
      </button>
    </div>
  );
}
