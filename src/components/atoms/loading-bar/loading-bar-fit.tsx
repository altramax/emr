'use client';

type Props = {
  width?: number; // in rem or px
  height?: number;
};

export default function Loading({ width = 20, height = 20 }: Props) {
  return (
    <div className="inset-0 flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <div
          className="relative animate-spin"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <div className="absolute inset-0 border border-t-transparent border-blue-500 rounded-full"></div>
          <div className="absolute inset-0 w-2 h-2 m-auto border-t-transparent border border-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
