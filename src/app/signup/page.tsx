"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [isLoading, setisLoading] = React.useState(false);
  const [buttonDisable, setbuttonDisable] = React.useState(true);

  const onSignup = async () => {
    try {
      setisLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error) {
      console.log("Signup error", error);
      toast.error("Error in signup");
    } finally {
      setisLoading(false);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setbuttonDisable(false);
    } else {
      setbuttonDisable(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-y-3 justify-center items-center min-h-screen py-2">
      <h1>{isLoading ? "Loading..." : "Signup Page"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        type="text"
        className="text-black"
        id="username"
        value={user.username}
        placeholder="Username"
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
      />
      <label htmlFor="email">Email</label>
      <input
        type="text"
        className="text-black"
        id="email"
        value={user.email}
        placeholder="Email"
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        className="text-black"
        id="password"
        value={user.password}
        placeholder="Password"
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
      />
      <button
        className="py-2 px-4 bg-indigo-500 disabled:bg-gray-400 text-white text-lg rounded-lg"
        onClick={onSignup}
        disabled={buttonDisable}
      >
        Signup
      </button>
      <Link href="/login">Goto Login</Link>
    </div>
  );
}
