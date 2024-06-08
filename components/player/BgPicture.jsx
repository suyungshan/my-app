"use client";

export default function BgPicture({ children }) {
  return (
    <div className="flex items-end justify-center max-w-[1024px] max-h-[800px]">
      <div className="relative">
        <img src="/DSCF0683.jpg" />
        <div>{children}</div>
      </div>
    </div>
  );
}
