import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

export default function ErrorPage({ code, description }) {
  // Use default description if not provided
  const displayDescription = description || "Sorry, the content you're looking for doesn't exist. Either it was removed, or you mistyped the link.";

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-10 bg-white">
      {/* Dynamic Error Code */}
      <h1 className="text-[120px] font-bold text-gray-500 leading-none mb-4">
        {code || "404"}
      </h1>

      {/* Dynamic/Default Description */}
      <p className="text-xl text-gray-700 max-w-2xl mb-12">
        {displayDescription}
      </p>

      {/* Buttons Container */}
      <div className="flex items-center space-x-4 mb-16">
        <Link to="/" className="bg-[#10B981] text-white px-8 py-3 rounded-md font-medium text-lg hover:bg-green-600 transition duration-300">
          Go to homepage
        </Link>
        <button className="bg-white text-[#10B981] px-8 py-3 rounded-md font-medium text-lg border-2 border-gray-100 hover:border-[#10B981] transition duration-300">
          Contact us
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-lg">
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
          <FaSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="search"
          placeholder="Search here"
          className="w-full pl-16 pr-6 py-4 border border-gray-200 rounded-full text-lg focus:ring-[#10B981] focus:border-[#10B981] focus:outline-none placeholder:text-gray-400"
        />
      </div>
    </div>
  );
}