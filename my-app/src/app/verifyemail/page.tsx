"use client";

import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function VErifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerfied] = useState(false);
  const [error, setError] = useState(false);

  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", {
        token,
      });
      setVerfied(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    const url = window.location.search.split("=");
    setToken(url[1]||"");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="flex felx-col items-center text-white min-h-screen py-2">
      <h1>verifyEmail</h1>
      <h2>{token ? `${token}` : "no token"}</h2>
      {verified && (
        <div className="flex flex-col items-center">
          <h1>Email verified successfully</h1>
          <Link href={"/login"}>Login</Link>
        </div>
      )}
      {error && (
        <div className="flex flex-col items-center bg-red-500">
          <h1>there was some error</h1>
        </div>
      )}
    </div>
  );
}
