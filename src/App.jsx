import { useEffect } from 'react'
import { SidebarOne } from './components/SidebarOne'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Login from './views/Login'
import Pagenotfound from './views/Pagenotfound'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase-config'
import Notadmin from './views/Notadmin'
import Details from './views/Details'
import Mainevents from "./views/Mainevents"

function App() {

  const navigate = useNavigate();

  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        if (userAuth.email != 'ecoculturalclubnsec@gmail.com')
          navigate("/denied");
        else if (currentPath.startsWith('/events/'))
          navigate(currentPath);
        else if (currentPath.startsWith('/mainevents/'))
          navigate(currentPath);
        else
          navigate('/')
      } else {
        navigate("/login");
      }
    });
  }, [navigate, currentPath])

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<SidebarOne />} />
        <Route path='/events/:eventtype/:id' element={<Details />} />
        <Route path='/mainevents/:email' element={<Mainevents />} />
        <Route path='/denied' element={<Notadmin />} />
        <Route path='*' element={<Pagenotfound />} />
      </Routes>
    </>
  )
}

export default App
