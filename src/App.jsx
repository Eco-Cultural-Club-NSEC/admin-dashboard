import { useEffect, useState } from 'react'
import { SidebarOne } from './components/SidebarOne'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './views/Login'
import Pagenotfound from './views/Pagenotfound'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase-config'
import Notadmin from './views/Notadmin'

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        if(userAuth.email != 'ecoculturalclubnsec@gmail.com')
          navigate("/denied");
        else
          navigate('/')
      } else {
        navigate("/login");
      }
    });
  }, [])

  return (
    <>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<SidebarOne/>}/>
      <Route path='/denied' element={<Notadmin/>}/>
      <Route path='*' element={<Pagenotfound/>}/>
    </Routes>
    </>
  )
}

export default App
