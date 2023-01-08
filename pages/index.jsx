import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Head from "next/head";
import { useRouter } from "next/router";
import Upload from "../components/Upload";
import { storage } from "../config/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import List from "../components/List";
import { uploadFile } from "../utils/firebase";

const Home = () => {
  const [fileList, setFileList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const { user, logout } = useContext(AuthContext);

  //upload file handler:
  const handleUpload = async (file) => {
    if (!file) return;
    setIsUploading(true);

    //creating a reference to the file location:
    const fileRef = ref(storage, `${user.uid}/${file.name}`);

    //upload the actual file:
    const res = await uploadFile(file, fileRef);
    setFileList((prev) => [...prev, res]);

    setIsUploading(false);
  };

  //fetch all files:
  useEffect(() => {
    const getFiles = async () => {
      setIsFetching(true);
      try {
        const filesRef = ref(storage, `${user.uid}`);
        const res = await listAll(filesRef);
        res.items.forEach(async (i) => {
          const url = await getDownloadURL(i);
          setFileList((prev) => [
            ...prev,
            {
              name: i.name,
              url,
            },
          ]);
        });
      } catch (err) {
        console.log(err.message);
      }
      setIsFetching(false);
    };

    if (user) {
      getFiles();
    } else {
      router.push("/auth");
    }
  }, [user]);

  return (
    <div className="min-h-screen min-w-full relative">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button
        onClick={logout}
        className="absolute bottom-4 right-5 px-4 py-2 text-white bg-red-600 rounded-md"
      >
        Logout
      </button>
      <Upload isUploading={isUploading} handleUpload={handleUpload} />

      {isFetching ? (
        <p className="text-center">Loading..</p>
      ) : (
        <List files={fileList} />
      )}
    </div>
  );
};

export default Home;
