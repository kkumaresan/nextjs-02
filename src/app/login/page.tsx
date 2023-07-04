"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [isLoading, setisLoading] = React.useState(false);
  const [buttonDisable, setbuttonDisable] = React.useState(true);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setbuttonDisable(false);
    } else {
      setbuttonDisable(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setisLoading(true);
      const response = await axios.post("/api/users/login/", user);
      console.log("Login success", response.data);
      toast.success("Login Success!");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error("Login Failed!");
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-3 justify-center items-center min-h-screen py-2">
      <h1>{isLoading ? "Loading.." : "Login Page"}</h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        className="text-black"
        value={user.email}
        placeholder="Email"
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        className="text-black"
        value={user.password}
        placeholder="Password"
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
      />
      <button
        className={"py-2 px-4 bg-indigo-500 disabled:bg-gray-400 text-white text-lg rounded-lg"}
        onClick={onLogin}
        disabled={buttonDisable}
      >
        Login
      </button>
      <Link href="/signup">Goto Signup</Link>
    </div>
  );
}
