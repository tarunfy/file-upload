import FileCard from "../Cards/FileCard";

const List = ({ files }) => {
  return (
    <div className="max-w-[960px] mx-auto mt-20">
      <ul className="border rounded w-full">
        {files.map((f) => (
          <FileCard key={f.url} file={f} />
        ))}
      </ul>
    </div>
  );
};

export default List;
