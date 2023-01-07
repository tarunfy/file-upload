import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Head from "next/head";
import { useRouter } from "next/router";
import Upload from "../components/Upload";
import { storage } from "../config/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import List from "../components/List";

export default function Home() {
  const [fileList, setFileList] = useState([]);
  const router = useRouter();
  const { user, logout } = useContext(AuthContext);

  //upload file handler:
  const handleUpload = async (file) => {
    if (!file) return;

    //creating a reference to the file location:
    const fileRef = ref(storage, `${user.uid}/${file.name}`);

    try {
      //upload the actual file:
      const res = await uploadBytes(fileRef, file);
      const url = await getDownloadURL(res.ref);
      setFileList((prev) => [
        ...prev,
        {
          name: res.ref.name,
          url,
        },
      ]);
    } catch (err) {
      console.log(err.message);
    }
  };

  //fetch all files:
  useEffect(() => {
    const getFiles = async () => {
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
    };

    if (user) {
      getFiles();
    } else {
      router.push("/auth");
    }
  }, []);

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
      <Upload handleUpload={handleUpload} />
      <List files={fileList} />
    </div>
  );
}
