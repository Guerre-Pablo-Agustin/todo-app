"use client";
import { lusitana } from "@/app/ui/fonts";
import i18n from "@/lib/i18n";
import { useAppStore } from "@/store/appStore";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { Trans } from "react-i18next";

export default function Logo() {

  const { language } = useAppStore();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[40px] whitespace-nowrap">
        <Trans i18nKey="login.title">Todo App</Trans>
      </p>
    </div>
  );
}
