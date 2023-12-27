import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function UserFound() {
  const navigate = useNavigate()
  const [showAcceptSpinner, setAcceptSpinner] = useState(false)
  const [showRejectSpinner, setRejectSpinner] = useState(false)

  const updateRecord = (decision) => {
    if(decision){
      setAcceptSpinner(true)

    }
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-6">
      <p className="font-bolder text-xl text-center">What do you want to do?</p>
      <div className="flex gap-5 items-center">
        <button className="px-6 py-3 text-base font-semibold text-center rounded-md bg-[#198754] text-white" onClick={() => updateRecord(1)}>Accept</button>
        <button className="px-6 py-3 text-base font-semibold text-center rounded-md bg-[#dc3545] text-white" onClick={() => updateRecord(0)}>Reject</button>
      </div>
    </div>
  )
}
