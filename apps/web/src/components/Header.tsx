import { ListIcon, XIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { NavLink } from "react-router";



export default function Header(): React.JSX.Element {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-center p-4 shadow-2xl">

      <div className="flex items-center gap-12">
        <NavLink to={"/"} className="text-2xl">
          LifeDB
        </NavLink>

        <ul className="hidden gap-6 md:flex">
          <li>
            <NavLink to="/help">Help</NavLink>
          </li>
          <li>
            <NavLink to="/docs">Docs</NavLink>
          </li>
        </ul>
      </div>

      <div className="ml-auto md:hidden">
        <button type="button" onClick={() => setIsSideMenuOpen(true)}>
          <ListIcon size={32} />
        </button>
      </div>

      <nav className={`fixed top-0 right-0 h-full w-60 bg-gray-200 ${isSideMenuOpen ? "" : "hidden"}`}>

        <div className="flex justify-end">
          <button type="button" className="p-4 " onClick={() => setIsSideMenuOpen(false)}>
            <XIcon size={32} />
          </button>
        </div>


        <div className="flex flex-col items-stretch px-4 text-2xl">
          <NavLink
            to="/" className={({ isActive }) =>
              `rounded px-2 py-0.5 ${isActive ? "bg-blue-400 text-white" : ""}`
            }
          >Home
          </NavLink>
          <NavLink
            to="/help" className={({ isActive }) =>
              `rounded px-2 py-0.5 ${isActive ? "bg-blue-400 text-white" : ""}`
            }
          >Help
          </NavLink>
          <NavLink
            to="/docs" className={({ isActive }) =>
              `rounded px-2 py-0.5 ${isActive ? "bg-blue-400 text-white" : ""}`
            }
          >Docs
          </NavLink>
        </div>
      </nav>

    </header>
  )
};



