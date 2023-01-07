import React from "react";

const Upload = () => {
  return (
    <div className="px-14 py-6 flex justify-center items-center">
      <input
        type="file"
        className="text-2xl text-white rounded hover:shadow-md transition bg-violet-600 border-white shadow px-6 py-2"
      />
    </div>
  );
};

export default Upload;
