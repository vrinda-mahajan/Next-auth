"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [user]);
  const onSignUp = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log(response.data);
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="py-8 flex flex-col justify-center items-center min-h-screen gap-3">
      <h2 className="text-2xl">Signup Form</h2>
      <div className="flex flex-col mb-2 w-1/5">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="username"
          className="p-2 rounded-md outline-none text-slate-900 "
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
      </div>
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
          onClick={onSignUp}
          className={` bg-transparent border-slate-50 border-solid border rounded-md p-2 px-4 mr-4 hover:bg-slate-800 ${
            isButtonDisabled ? `cursor-not-allowed` : ``
          }`}
        >
          Signup
        </button>
        <Link className="underline " href={"/login"}>
          Login here
        </Link>
      </div>
    </div>
  );
}
