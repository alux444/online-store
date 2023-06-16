import { query } from "firebase/database";
import { db } from "../../firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";

const testDb = async () => {
  const now = new Date();
  const testRef = collection(db, "test");
  const read = await getDocs(query(testRef));
  read.docs.map((post) => {
    console.log(post.data());
  });
  console.log("You should see objects returned ^");

  try {
    await addDoc(testRef, {
      date: now,
    });
    console.log("Writing successful.");
  } catch (error) {
    console.error("Error in writing :", error);
  }
};

export default testDb;
