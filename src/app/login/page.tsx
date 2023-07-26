"use client";

import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {};
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
      <button onClick={onLogin} className="bg-transparent border-slate-50 border-solid border rounded-md p-2 px-4 mr-4 hover:bg-slate-800">Login</button>
      <Link className="underline " href={"/signup"}>Signup here</Link>
      </div>
    </div>
  );
}
