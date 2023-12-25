import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase-config";

function Login() {
  const navigate = useNavigate();

  const loginHandler = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        if (result.user.email != "ecoculturalclubnsec@gmail.com")
          navigate("/denied");
        else navigate("/");
      })
      .catch((error) => {
        alert("Login Failed");
      });
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-blue-700">
      <button
        className="flex gap-4 self-center border-2 bg-white text-blue-600 border-blue-600 shadow-md font-bold rounded-full px-6 py-3 uppercase  text-sm"
        onClick={loginHandler}
      >
        <FcGoogle size={20} />
        Sign In With Google
      </button>
    </div>
  );
}

export default Login;
