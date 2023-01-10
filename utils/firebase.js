import { getDownloadURL, uploadBytes } from "firebase/storage";

export const uploadFile = async (file, fileRef) => {
  try {
    const res = await uploadBytes(fileRef, file);
    const url = await getDownloadURL(res.ref);
    return {
      name: res.ref.name,
      url,
    };
  } catch (err) {
    console.log(err.message);
  }
};

export const downloadFile = async (url, fileName) => {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const blob = await res.blob();
  const aElement = document.createElement("a");
  aElement.setAttribute("download", fileName);
  const href = URL.createObjectURL(blob);
  aElement.href = href;
  aElement.setAttribute("target", "_blank");
  aElement.click();
  URL.revokeObjectURL(href);
};
