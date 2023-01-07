import { downloadFile } from "../../utils/firebase";

const FileCard = ({ file }) => {
  return (
    <div
      className="p-4 border-b border-[2px] min-w-full text-2xl cursor-pointer"
      onClick={() => downloadFile(file.url, file.name)}
    >
      {file.name}
    </div>
  );
};

export default FileCard;
