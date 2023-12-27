import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import axios from "axios";
import { APIURL } from "./apiURL";

export const updateSingleRegPayment = async (id, email, reg, user) => {
  let update = {
    payment_verified: true,
  };
  try {
    if (!reg) {
      await setDoc(doc(db, "singleReg", id), update, { merge: true });
      try {
        await axios.post(`${APIURL}/sendMail`, {
          user: [...user],
          emailID: email,
          id
        })
      }
      catch (err) {
        console.log("Error")
      }
      return true;
    } else {
      await setDoc(doc(db, "multiReg", id), update, { merge: true });
      try {
        await axios.post(`${APIURL}/sendMail`, {
          user: [...user],
          emailID: email,
          id
        })
      }
      catch (err) {
        console.log("Error")
      }
      return true;
    }
    //email
  } catch (error) {
    console.log(error);
    return false;
  }
};
