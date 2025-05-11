"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-50">
      <div className="flex flex-col items-center gap-5">
        <div className="relative w-24 h-24 animate-spin">
          <div className="absolute inset-0 border-4 border-t-transparent border-blue-500 rounded-full"></div>
          <div className="absolute inset-0 w-16 h-16 m-auto border-4 border-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
