import { Spinner } from "@chakra-ui/react";
import React from "react";

const OverlayLoader = () => {
  return (
    <div className="flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 bg-white opacity-50">
      <Spinner />
    </div>
  );
};
export default OverlayLoader;
