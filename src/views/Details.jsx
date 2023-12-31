import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APIURL } from '../utils/apiURL'
import { UserFound } from '../components/UserFound'

const Details = () => {
  const { eventtype, id } = useParams()
  const [present, setPresent] = useState(false)
  useEffect(() => {

    (async function() {
      try {
        const response = await axios.post(
          `${APIURL}/checkValidity`,
          {
            id,
            collectionName: eventtype
          },
        )
        setPresent(true)
        console.log("Yay")
      }
      catch (err) {
        console.log(err)
      }
    })()

  }, [])
  return (
    <>
      {present ? <UserFound /> : <p>User not found</p>}
    </>
  )
}

export default Details
