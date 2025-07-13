import { ListIcon, XIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import Header from "../../components/Header";

export default function HomeLayout(): React.JSX.Element {

  return (
    <div>
      <Header />
      <main className="flex justify-center pt-10">
        <Outlet />
      </main>
    </div>
  );
}
