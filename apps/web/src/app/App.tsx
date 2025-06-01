import { BrowserRouter, Routes, Route } from "react-router"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Auth from "./pages/Auth"
import HomeLayout from "./pages/HomeLayout"
import Help from "./pages/Help"
import Docs from "./pages/Docs"

function App() {

  return (

    // <div className="h-screen w-screen">
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


        <Route path="/app" element={<App />} />

      </Routes>
    </BrowserRouter>



  )
}

export default App
