import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APIURL } from '../utils/apiURL'
import { UserFound } from '../components/UserFound'
import { Loader2Icon } from 'lucide-react'
import AlreadyVerified from '../components/AlreadyVerified'

const Details = () => {
  const { eventtype, id } = useParams()
  const [present, setPresent] = useState("loading")
  const [user, setUser] = useState()
  useEffect(() => {

    (async function () {
      try {
        const response = await axios.post(
          `${APIURL}/checkValidity`,
          {
            id,
            collectionName: eventtype
          },
        )

        console.log(response.data.documents[0])
        setUser(response.data.documents[0])
        if(response.data.documents[0].entry){
          setPresent("verified")
        }
        else{
          setPresent("found")
        }
      }
      catch (err) {
        console.log(err)
        setPresent("notfound")
      }
    })()

  }, [])
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      {present === "loading" && <Loader2Icon className='animate-spin' />}
      {present === "verified" && <AlreadyVerified />}
      {present === "found" && <UserFound user={user} />}
      {present === "notfound" && <p>User not found</p>}
    </div>
  )
}

export default Details
