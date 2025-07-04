import { BrowserRouter, Routes, Route } from "react-router"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Auth from "./pages/Auth"
import HomeLayout from "./pages/HomeLayout"
import Help from "./pages/Help"
import Docs from "./pages/Docs"
import LifeDb from "./LifeDb"
import ProtectedRoute from "./pages/ProtectedRoute"
import { useEffect } from "react"
import { useAuthStore } from "../store/useAuthStore"

function App() {



  useEffect(() => {
    useAuthStore.getState().init();
  }, [])

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomeLayout />} >
          <Route index element={<Home />} />
          <Route path="help" element={<Help />} />
          <Route path="docs" element={<Docs />} />
        </Route>




        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/app" element={<LifeDb />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
