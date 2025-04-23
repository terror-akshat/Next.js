"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [button, setButton] = React.useState(true); // Default to 'disabled'
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false); // Start with loading as false

  const OnSignUp = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true); // Start loading before the request
      const response = await axios.post("/api/users/signup", {
        username: user.username,
        email : user.email,
        password: user.password
      }); // Send the user object directly
      console.log(response.data);
      router.push("/login"); // Redirect to login page upon successful signup
    } catch (err) {
      console.log(err); // Log error if request fails
    } finally {
      setLoading(false); // Stop loading after request finishes
    }
  };

  useEffect(() => {
    // Enable the button only if all fields are filled
    if (user.username && user.email && user.password) {
      setButton(false); // Enable button if all fields are filled
    } else {
      setButton(true); // Disable button if any field is empty
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-white">
        {loading ? "Sign Up..." : "Sign Up"}{" "}
        {/* Show loading text while processing */}
      </h1>
      <hr />
      <label htmlFor="username">name</label>
      <input
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="border-2 border-gray-300 rounded-md p-2 mb-4"
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="border-2 border-gray-300 rounded-md p-2 mb-4"
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="border-2 border-gray-300 rounded-md p-2 mb-4"
      />
      <button
        onClick={OnSignUp}
        className="bg-blue-500 text-white rounded-md p-2"
        disabled={button} // Disable button if any field is empty
      >
        {loading ? "Processing..." : "Sign Up"}{" "}
        {/* Change button text while processing */}
      </button>
      <p className="mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500">
          Login
        </a>
      </p>
    </div>
  );
}
