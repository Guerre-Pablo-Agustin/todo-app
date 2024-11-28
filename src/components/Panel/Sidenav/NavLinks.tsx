"use client";

import i18n from "@/lib/i18n";
import { useAppStore } from "@/store/appStore";
import { HomeIcon } from "@heroicons/react/20/solid";
import { ListBulletIcon, TableCellsIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Links = [
  { name: "panel.sidevar.home", href: "/panel", icon: HomeIcon },
  { name: "panel.sidevar.create", href: "/panel/create", icon: ListBulletIcon },
  { name: "panel.sidevar.kanban", href: "/panel/kanban", icon: TableCellsIcon },
];

export default function NavLinks() {
  const { user, language } = useAppStore();
  const pathName = usePathname();

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

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
            <p className="hidden md:block">{i18n.t(link.name)}</p>
          </Link>
        );
      })}
    </>
  );
}
