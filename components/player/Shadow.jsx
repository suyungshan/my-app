"use client";

export default function Shadow(props) {
  return (
    <div
      className="flex items-center justify-center bg-text-black/50 w-screen z-20 sm:z-20 h-screen fixed top-0 left-0 "
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}
