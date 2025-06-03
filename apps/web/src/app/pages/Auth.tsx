import { DatabaseIcon } from "@phosphor-icons/react"
import { Outlet } from "react-router"


export default function Auth(): React.JSX.Element {

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center ">
      <DatabaseIcon size={96} color="#EF4764" />
      <Outlet />
    </div>
  )
};

