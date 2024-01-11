import React from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const Mainevents = () => {
  const [status, setStatus] = React.useState("")
  const location = useLocation()
  const email = location.pathname.split("/")[2]

  const verifyUser = async () => {
    try {
      await axios.get(`https://sapi.slickapp.co/os-user-master/verify_entry/${email}/asdfghjk`)
      setStatus("Verified🥳")
    }
    catch (err) {
      setStatus("User already verified")
    }
  }

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center'>
      <button className='bg-green-700 text-white rounded-md py-2 px-5 uppercase font-bold' onClick={() => verifyUser()}>
        Verify User
      </button>
      {status}
    </div>
  )
}

export default Mainevents
