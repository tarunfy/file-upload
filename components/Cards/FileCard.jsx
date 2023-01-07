const FileCard = ({ file }) => {
  return (
    <div className="p-4 border-b border-[2px]  w-full">
      <a
        className="w-full text-2xl bg-slate-200"
        href={file.url}
        download={file.name}
      >
        {file.name}
      </a>
    </div>
  );
};

export default FileCard;
