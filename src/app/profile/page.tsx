"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
export default function ProfilePage() {
  const router = useRouter();
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
  return (
    <div className="py-8 flex flex-col justify-center items-center min-h-screen gap-3">
      <h2>User Profile</h2>
      <button
        onClick={onLogout}
        className="px-2 py-1 bg-red-500 text-slate-50 rounded-md hover:text-slate-200"
      >
        Logout
      </button>
    </div>
  );
}
