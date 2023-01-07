const FileCard = ({ file }) => {
  return (
    <div className="p-4 border-b border-[2px] min-w-full">
      <a className="text-2xl" href={file.url} download={file.name}>
        {file.name}
      </a>
    </div>
  );
};

export default FileCard;
