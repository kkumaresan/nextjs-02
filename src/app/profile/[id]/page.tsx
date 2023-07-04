"use client";
export default function UserProfilePage({ params }: any) {
  return (
    <div className="flex flex-col gap-y-3 justify-center items-center min-h-screen py-2">
      <h1>ID: {params.id}</h1>
    </div>
  );
}
