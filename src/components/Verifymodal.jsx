import React, { useState } from "react";
import { updateSingleRegPayment } from "../utils/payment";

export default function Verifymodal({
  setModal,
  id,
  email,
  userData,
  setUserData,
  reg,
  user
}) {
  const [showModal, setShowModal] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const verified = async () => {
    setSpinner(true)
    const status = await updateSingleRegPayment(id, email, reg, user);
    if (!status) return false;
    setShowModal(false);
    setModal(false);
    setSpinner(false)
    let data = [...userData];
    const ind = data.findIndex((e) => e.id === id);
    let updatedInfo = {
      ...data[ind],
    };
    updatedInfo.payment_verified = true;
    data[ind] = updatedInfo;
    data.sort((a, b) => {
      return a.payment_verified - b.payment_verified;
    })
    setUserData(data);
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
                    {spinner ? <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <style>{`.spinner_6kVp{transform-origin:center;animation:spinner_irSm .75s infinite linear}@keyframes spinner_irSm{100%{transform:rotate(360deg)}}`}</style>
                      <path d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z" className="spinner_6kVp" />
                    </svg>
                      : <span>Yes</span>
                    }
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
