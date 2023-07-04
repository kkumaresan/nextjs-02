"use client";

import { toast } from "react-hot-toast";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const [userData, setuserData] = useState("as");
  const router = useRouter();

  const getUserData = async () => {
    const user = await axios("/api/users/me");
    console.log(user)
    setuserData(user.data.data);
  };

  const logout = async () => {
    try {
      const logout = await axios.get("/api/users/logout");
      toast.success(logout.data.message);
      router.push("/login");
    } catch (error) {
      toast.error("Logout Failed!");
    }
  };
  return (
    <div className="flex flex-col gap-y-3 justify-center items-center min-h-screen py-2">
      <h1>Profile</h1>
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      <button
        onClick={getUserData}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Get Data
      </button>
      <code className="text-white">{JSON.stringify(userData)}</code>
    </div>
  );
}
