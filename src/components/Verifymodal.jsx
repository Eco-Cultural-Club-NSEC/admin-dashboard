import { collection, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { updateSingleRegPayment } from "../utils/payment";

export default function Verifymodal({
  setModal,
  id,
  email,
  userData,
  setUserData,
  reg,
}) {
  const [showModal, setShowModal] = useState(false);

  const verified = async () => {
    const status = await updateSingleRegPayment(id, email, reg);
    if (!status) return false;
    setShowModal(false);
    setModal(false);
    let data = [...userData];
    const ind = data.findIndex((e) => e.id === id);
    let updatedInfo = {
      ...data[ind],
    };
    updatedInfo.payment_verified = true;
    data[ind] = updatedInfo;
    setUserData(data);
    console.log(data);
  };
  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Verify
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-6 flex justify-center">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed text-blue-600">
                    Are you sure you want to verify the payment?
                  </p>
                </div>
                <div className="flex items-center justify-evenly p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={verified}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
