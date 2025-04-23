export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-white">Profile</h1>
      <hr />
      <p className="mt-4">This is the profile page {params.id}.</p>
    </div>
  );
}
