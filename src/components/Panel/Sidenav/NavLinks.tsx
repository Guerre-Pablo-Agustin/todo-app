"use client";


import { useAppStore } from "@/store/appStore";
import { HomeIcon } from "@heroicons/react/20/solid";
import { ListBulletIcon, TableCellsIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";


const Links = [
  { name: "Inicio", href: "/panel", icon: HomeIcon },
  { name: "Crear tarea", href: "/panel/create", icon: ListBulletIcon },
  { name: "Kanban", href: "/panel/kanban", icon: TableCellsIcon },
];



export default function NavLinks() {
  const {user} = useAppStore();
  const pathName = usePathname();


  useEffect(() => {
    console.log("user", user);
  }, [user]);

  return (
    <>
      {Links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] items-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3
              ${
                pathName === link.href
                  ? "bg-sky-100 text-blue-600"
                  : "bg-gray-50 text-gray-800"
              }
            `}
            aria-label={link.name}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
