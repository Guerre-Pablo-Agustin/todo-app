"use client";
import Link from "next/link";
import NavLinks from "./NavLinks";
import Image from "next/image";


import { useRouter } from "next/navigation";
import { GlobeAltIcon, PowerIcon } from "@heroicons/react/24/outline";
import { useAppStore } from "@/store/appStore";
import { useEffect } from "react";

export default function SideNav() {

const {user, loaduser , logout} = useAppStore();
  
  const router = useRouter();

 useEffect(() => {
    loaduser();
  }, [loaduser]);

  const handleLogout = () => {
    const confirmed = confirm("¿Seguro que quieres cerrar tu sesión?");
    if (confirmed) {
      logout();
      router.push("/login");
    }
  };




  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 ">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md p-4 md:h-40 shadow-md shadow-gray-400 bg-blue-600"
        href="/panel"
      >
        <div className="w-[70%]  ">
       
        <GlobeAltIcon className="h-12 w-12 rotate-[15deg] text-white" />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block">


        </div>
        {user && user.image ? (
          <div className="flex  p-3 md:p-2 md:px-3">
            <Image
              src={user?.image}
              alt="Profile"
              width={50}
              height={50}
              className="rounded-full hidden md:block"
            />
          </div>
        ) : (
          <div className="w-12 h-12 bg-gray-300 rounded-full" />
        )}

   
        <button
          onClick={handleLogout}
          type="submit"
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          aria-label="Sign Out"
        >
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Cerrar sesión</div>
        </button>
      </div>
    </div>
  );
}
