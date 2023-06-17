import React from "react";
import Navbar from "../utility/navbar/Navbar";

function Body(props) {
  return (
    <section className="bg-gray-300 w-full h-screen flex flex-col">
      <Navbar />
      <div className="w-full h-full p-1 flex justify-center items-start overflow-y-scroll">
        {props.children}
      </div>
    </section>
  );
}

export default Body;
