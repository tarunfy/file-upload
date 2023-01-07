import { useState } from "react";

const Upload = ({ handleUpload, isUploading }) => {
  const [file, setFile] = useState(null);

  return (
    <div className="px-14 py-6 flex justify-center items-center space-x-2">
      <input
        onChange={(e) => setFile(e.target.files[0])}
        type="file"
        className="text-xl text-white rounded hover:shadow-md transition bg-violet-600 border-white shadow px-6 py-2"
      />
      <button
        disabled={!file || isUploading}
        onClick={() => handleUpload(file)}
        className="text-2xl disabled:cursor-not-allowed disabled:opacity-70 text-white rounded hover:shadow-md transition bg-sky-500 border-white shadow px-6 py-2"
      >
        Upload
      </button>
    </div>
  );
};

export default Upload;
