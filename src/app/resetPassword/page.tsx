"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [checkPassword, setCheckPassword] = useState(true);

  const resetPassword = async () => {
    try {
      const response = await axios.post("/api/users/resetPassword", {
        token,
        newPassword,
      });
      toast.success("Password updated successfully!");
      router.push("/login");
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const onSubmit = () => {
    newPassword.length > 0 && newPassword === confirmPassword
      ? setCheckPassword(true)
      : setCheckPassword(false);

    if (checkPassword && token.length > 0 && newPassword.length > 0) {
      resetPassword();
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Reset Password🔑</h1>
      <h2 className="my-6 p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>

      <div className="flex flex-col mb-2 w-1/5">
        <label htmlFor="password">New Password</label>
        <input
          id="password"
          type="password"
          placeholder="password"
          className="p-2 rounded-md outline-none text-slate-900"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col mb-2 w-1/5">
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          id="confirm-password"
          type="password"
          placeholder="confirm password"
          className="p-2 rounded-md outline-none text-slate-900"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <span className="text-red-600">
        {checkPassword ? "" : "Password does not match."}
      </span>
      <button
        onClick={onSubmit}
        className={` bg-transparent border-slate-50 border-solid border rounded-md p-2 px-4 mr-4 hover:bg-slate-800 `}
      >
        Submit
      </button>
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
        </div>
      )}
    </div>
  );
}
