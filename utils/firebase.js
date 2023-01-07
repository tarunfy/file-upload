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
  fetch(url, {
    method: "get",
    mode: "no-cors",
    referrerPolicy: "no-referrer",
  })
    .then((res) => res.blob())
    .then((res) => {
      const aElement = document.createElement("a");
      aElement.setAttribute("download", fileName);
      const href = URL.createObjectURL(res);
      aElement.href = href;
      aElement.setAttribute("target", "_blank");
      aElement.click();
      URL.revokeObjectURL(href);
    });
};
