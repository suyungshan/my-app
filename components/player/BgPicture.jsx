"use client";

export default function BgPicture({ children }) {
  return (
    <div className="flex items-end justify-center max-w-[1024px] max-h-[800px]">
      <div className="w-full h-full relative">
        <img src="/DSCF0683-2.png" className="w-full h-1/2 object-cover" />
        <div className="absolute max-w-[1024px] bottom-0 left-1/2 transform -translate-x-1/2 w-full h-1/2">
          {children}
        </div>
      </div>
    </div>
  );
}
