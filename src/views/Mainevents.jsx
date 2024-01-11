import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const Mainevents = () => {
  const [verified, setVerified] = useState(false)
  const location = useLocation()
  const email = location.pathname.split("/")[2]
  useEffect(() => {

    (async function() {
      const res = await axios.get(`https://sapi.slickapp.co/os-user-master/verify_entry/${email}/asdfghjk`)
      if (res.ok) {
        setVerified(true)
      }
    })()

  }, [])

  return (
    <>
      {!verified ? <p>User already verified!</p> : <p className='text-green-600'>VERIFIED!</p>}
    </>
  )
}

export default Mainevents
