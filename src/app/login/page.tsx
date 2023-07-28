"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", user);
      console.log(response.data);
      if (response.data.success) {
        router.push("/profile");
        toast.success("Logged in successfully!");
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error("User not found!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="py-8 flex flex-col justify-center items-center min-h-screen gap-3">
      <h2 className="text-2xl">Login Form</h2>
      <div className="flex flex-col mb-2 w-1/5">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="email"
          className="p-2 rounded-md outline-none text-slate-900"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div className="flex flex-col mb-2 w-1/5">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="password"
          className="p-2 rounded-md outline-none text-slate-900"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>
      <div className="flex items-center">
        <button
          onClick={onLogin}
          className={` bg-transparent border-slate-50 border-solid border rounded-md p-2 px-4 mr-4 hover:bg-slate-800 ${
            isButtonDisabled ? `cursor-not-allowed` : ``
          }`}
        >
          Login
        </button>
        <Link className="underline " href={"/signup"}>
          Signup here
        </Link>
      </div>
    </div>
  );
}
