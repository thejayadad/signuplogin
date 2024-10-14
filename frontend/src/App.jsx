import {Route, Routes} from "react-router-dom"
import AuthPage from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'
import PostPage from './pages/PostPage'

function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/profile/post/:id' element={<PostPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
