import React from "react";

const Forbidden = () => {
  return (
    <div className="w-screen h-screen grid place-items-center bg-slate-200">
      <div>
        <span className="text-5xl font-bold text-slate-500">403</span>{" "}
        <span className="text-xl text-slate-400">Forbidden</span>
      </div>
    </div>
  );
};

export default Forbidden;
