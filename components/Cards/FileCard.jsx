const FileCard = ({ file }) => {
  return (
    <div>
      <a href={file.url} download={file.name}>
        {file.name}
      </a>
    </div>
  );
};

export default FileCard;
