import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2Icon } from "lucide-react";
import { APIURL } from "../utils/apiURL";
import { useLocation } from "react-router-dom";
import axios from "axios";

const DataToDisplay = [
  {
    title: "College",
    field: "College_Name"
  },
  {
    title: "Email",
    field: "Email"
  },
  {
    title: "Event",
    field: "Event"
  },
  {
    title: "Number",
    field: "Whatsapp_Number"
  },

]

export function UserFound({ user }) {
  const navigate = useNavigate()
  const [spinner, setSpinner] = useState(false)

  const location = useLocation()
  const pathArr = location.pathname.split("/")

  const [showAcceptSpinner, setAcceptSpinner] = useState(false)
  const [showRejectSpinner, setRejectSpinner] = useState(false)

  const updateRecord = async () => {
    try {
      setSpinner(true)
      await axios.put(
        `${APIURL}/update`,
        {
          id: pathArr[3],
          collectionName: pathArr[2]
        }
      )
      alert(`Verified!`)
      navigate("/")
    }
    catch (err) {
      console.log(err)
      alert("Something wen't wrong X(")
    }
    finally {
      setSpinner(false)
    }
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-6">
      <p className="font-bolder text-xl text-center">
        <p className="font-bold text-xl">
          {Array.isArray(user.Name) ? user.Name.join(", ") : user.Name}
        </p>

        <details className="font-sm w-screen">
          <summary>Click here to view details</summary>
          <ul>

            {
              DataToDisplay.map((ele, i) => (
                <li className="flex items-center justify-between my-2 w-full px-3">
                  <p className="font-bold text-blue-500 w-[30%] text-start text-sm">{ele.title}</p>
                  <p className="bg-gray-200 px-3 py-1 rounded-md w-full text-start text-sm">{user[ele.field]}</p>
                </li>
              ))
            }

          </ul>
        </details>
      </p>
      <div className="flex gap-5 items-center">
        <button className="px-6 py-3 text-base font-semibold text-center rounded-md bg-[#198754] text-white" onClick={() => updateRecord()}>
          {spinner ? <Loader2Icon className="animate-spin" /> : <p>Accept</p>}
        </button>
        <button className="px-6 py-3 text-base font-semibold text-center rounded-md bg-[#dc3545] text-white" onClick={() => alert("Haha! This button only serves as a decorative purpose")}>Reject</button>
      </div>
    </div>
  )
}
