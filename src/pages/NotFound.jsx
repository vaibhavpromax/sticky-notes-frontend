import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-gray-200 h-screen flex flex-col justify-center items-center">
      <h2 className="text-9xl uppercase font-black">404</h2>
      <h1 className="text-6xl uppercase font-black">Page Not Found</h1>
      <p className="text-2xl mt-10 mb-20">Please go back to our Home Page</p>
      <Link
        to="/"
        className="py-6 px-10 bg-gray-400 rounded-full text-3xl hover:bg-gray-300 transition duration-300 ease-in-out flex items-center animate-bounce"
      >
        Back to Home
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 ml-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="black"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </Link>
    </div>
  );
};

export default NotFound;
