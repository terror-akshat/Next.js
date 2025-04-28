"use client";
import axios from "axios";
import Link from "next/link";
// import Link from "next//link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const handleLogout = async () => {
    try {
      const response = await axios.get("api/users/logout");
      if (response.data.status === 200) {
        toast.success(response.data.message);
        router.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data.user);
      if (res.data.status === 200) {
        setData(res.data.user._id);
        console.log(res.data.user._id);
        router.push(`/profile/${res.data.user._id}`);
      }
      if (res.data.status === 404) {
        toast.error(res.data.message);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-white">Profile</h1>
      <hr />
      <p className="mt-4">This is the profile page.</p>
      <hr />
      {/* {data ? (
        "nothing is here right now"
      ) : (
        <Link href={`/profile/${data}`}>deetails</Link>
      )} */}
      <button
        className="bg-blue-500 mt-4 hover:bg-grey-700 text-white rounded-sm p-4 m-10"
        onClick={handleLogout}
      >
        Logout
      </button>
      <button onClick={getUserDetails}>Get</button>
    </div>
  );
}
