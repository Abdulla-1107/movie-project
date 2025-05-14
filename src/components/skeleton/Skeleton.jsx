import React from 'react';

const Skeleton = ({ count }) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array(count)
          .fill("")
          .map((_, index) => (
            <div key={index} className="w-[220px] mx-auto">
              <div className="relative w-full h-[420px] bg-gray-300 rounded-xl animate-pulse"></div>
              <div className="w-10/12 h-6 mt-2 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-1/2 h-5 mt-1 bg-gray-300 rounded animate-pulse"></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Skeleton;