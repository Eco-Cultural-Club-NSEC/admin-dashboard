import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";

export const updateSingleRegPayment = async (id, email, reg) => {
  let update = {
    payment_verified: true,
  };
  try {
    if (!reg) {
      await setDoc(doc(db, "singleReg", id), update, { merge: true });
      return true;
    } else {
      await setDoc(doc(db, "multiReg", id), update, { merge: true });
      return true;
    }
    //email
  } catch (error) {
    console.log(error);
    return false;
  }
};
