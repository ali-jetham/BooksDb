import axios from "axios";
import { createContext, useContext, useEffect, useState, type JSX, type ReactNode } from "react";
import { API_URL } from "../utils/constants";

interface ProviderProps {
  isAuthenticated: boolean
  id: string
}

export const AuthContext = createContext<ProviderProps>({
  isAuthenticated: false,
  id: ""
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {

  useEffect(() => {
    axios.get(`${API_URL}/auth/me`, { withCredentials: true })
      .then(res => console.log(res))

  }, [])

  const [id, setId] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  function login() {

  }

  function logout() {

  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, id }}>
      {children}
    </ AuthContext.Provider>
  )
}
