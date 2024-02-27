"use client";

const Shadow = (props) => {
  return (
    <div
      className="flex items-center justify-center bg-text-black/50 w-screen z-20 sm:z-10 h-screen fixed top-0 left-0 "
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default Shadow;
