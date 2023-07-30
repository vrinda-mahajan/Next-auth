"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ForgetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const onSendEmail = async () => {
    try {
      await axios.post("/api/users/forgetPassword", { email });
      toast.success("A mail has been sent to your email!");
      router.push("/login");
    } catch (error: any) {
      console.log(error.response.data);
    }
  };
  return (
    <div className="py-8 flex flex-col justify-center items-center min-h-screen gap-3">
      <h2 className="text-2xl">
        We will send an email to your account to reset the password.
      </h2>
      <div className="flex flex-col mb-2 w-1/5">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter email"
          className="p-2 rounded-md outline-none text-slate-900"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        onClick={onSendEmail}
        className={` bg-transparent border-slate-50 border-solid border rounded-md p-2 px-4 mr-4 hover:bg-slate-800 `}
      >
        Send Email
      </button>
    </div>
  );
}
