"use client";
import { useParams } from "next/navigation";

export default function ProfilePageId() {
  const id = useParams().id;
  return (
    <div>
      <h1>Profile Page</h1>
      <p>Profile ID</p>
      <hr />
      {id}
    </div>
  );
}
