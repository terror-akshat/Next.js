"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const OnLogin = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log(response.data);

      if (response.data.status === 201) {
        alert("Login successfuly");
        router.push("/profile");
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-white">
        {loading ? "Processing" : "Login"}
      </h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="border-2 border-gray-300 rounded-md p-2 mb-4"
      />
      <label htmlFor="password">password</label>
      <input
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="border-2 border-gray-300 rounded-md p-2 mb-4"
      />
      <button
        onClick={OnLogin}
        className="bg-blue-500 text-white rounded-md p-2"
      >
        Login
      </button>
    </div>
  );
}
