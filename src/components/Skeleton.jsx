import React from "react";

const Skeleton = ({ className }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-200 h-full w-full mb-2"></div>
    </div>
  );
};

export default Skeleton;
