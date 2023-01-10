const UploadInput = ({ handleUpload, isUploading, inputRef }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpload(inputRef?.current?.files[0]);
    e.target.reset();
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="px-14 py-6 flex justify-center items-center space-x-2"
      >
        <input
          ref={inputRef}
          type="file"
          required
          className="text-xl text-white rounded hover:shadow-md transition bg-violet-600 border-white shadow px-6 py-2"
        />
        <button
          disabled={isUploading}
          type="submit"
          className="text-2xl disabled:cursor-not-allowed disabled:opacity-70 text-white rounded hover:shadow-md transition bg-sky-500 border-white shadow px-6 py-2"
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default UploadInput;
