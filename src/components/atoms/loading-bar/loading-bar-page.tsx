'use client';

export default function Loading() {
  return (
    <div className="inset-0 z-50 w-full h-[98vh] flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-5">
        <div className="relative w-20 h-20 animate-spin">
          <div className="absolute inset-0 border-4 border-t-transparent border-blue-500 rounded-full"></div>
          <div className="absolute inset-0 w-12 h-12 m-auto border-4 border-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
