"use client";
import axios from "axios";
// import Link from "next//link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function ProfilePage() {
  const router = useRouter();
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
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-white">Profile</h1>
      <hr />
      <p className="mt-4">This is the profile page.</p>
      <button
        className="bg-blue-500 mt-4 hover:bg-grey-700 text-white rounded-sm p-4 m-10"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
