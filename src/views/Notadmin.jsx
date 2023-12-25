import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase-config";

const Notadmin = () => {
  const logoutHandler = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  return (
    <div>
      This Account doesnot have Admin access.
      <button
        onClick={logoutHandler}
        className="flex justify-center items-center gap-4 self-center border-2 bg-white text-blue-600 border-blue-600 shadow-md font-bold rounded-full px-6 py-3 uppercase  text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Notadmin;
