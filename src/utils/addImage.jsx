import React from "react";
import {
  ref,
  getStorage,
  uploadBytes,
  getDownloadURL,
} from "firebase/database";

const addImage = async ({ imageFile, id }) => {
  const storage = getStorage();
  const storageRef = ref(storage, "images/" + id);
  let url = "";

  try {
    await uploadBytes(storageRef, imageFile);
    url = await getDownloadURL(storageRef);
  } catch (error) {
    console.log("error uploading");
  }

  return url;
};

export default addImage;
