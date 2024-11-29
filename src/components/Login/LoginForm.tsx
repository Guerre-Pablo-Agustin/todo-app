"use client";

import { AtSymbolIcon, EyeIcon, KeyIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useFormStatus } from "react-dom";
import { lusitana } from "@/app/ui/fonts";
import { useAppStore } from "@/store/appStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import i18n from "../../lib/i18n";
import { Trans } from "react-i18next";
import Link from "next/link";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

export default function LoginForm() {
  const { language } = useAppStore();
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const { login } = useAppStore();

  const router = useRouter();

  const [error, setError] = useState("");

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = login(userData.email, userData.password);
      if (result) {
        router.push("/panel");
        setUserData({
          email: "",
          password: "",
        });
        setError("");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={` ${lusitana.className} mb-3 text-xl text-black`}>
          <Trans i18nKey="login.presentation">
            Welcome to the task application. Please login to continue.
          </Trans>
        </h1>

        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              <Trans i18nKey="login.labelEmail">Email</Trans>
            </label>
            <div className="relative">
              <input
                className="peer text-black block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                value={userData.email}
                placeholder="Enter your email address"
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
  <label
    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
    htmlFor="password"
  >
    <Trans i18nKey="login.labelPassword">Password</Trans>
  </label>
  <div className="relative">
    <input
      className="peer text-black block w-full rounded-md border border-gray-200 py-[9px] pl-10 pr-10 text-sm outline-2 placeholder:text-gray-500"
      id="password"
      type={showPassword ? "text" : "password"}
      name="password"
      placeholder="Enter password"
      value={userData.password}
      onChange={(e) =>
        setUserData({ ...userData, password: e.target.value })
      }
      required
      minLength={6}
    />
    <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

   
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none "
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? (
      <RiEyeLine className="w-5 h-5 "/>
      ) : (
        <RiEyeCloseLine className="w-5 h-5 "/>
      )}
    </button>
  </div>
</div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <LoginButton />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        ></div>

        <div className="flex items-center justify-center gap-2">
          <p className="items-center text-sm text-gray-500">
            <Trans i18nKey="login.loginQuestion">no tienes cuenta?</Trans>
          </p>

          <Link href="/login/register" legacyBehavior>
            <a className="text-blue-500 hover:underline items-center justify-center">
              <Trans i18nKey="login.register">Create an account</Trans>
            </a>
          </Link>
        </div>
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className={`${
        pending ? "bg-blue-300" : "bg-blue-500"
      } flex items-center justify-center rounded-md py-2 mt-4 w-full text-white hover:bg-blue-400 shadow-md shadow-blue-500/50 transition-all duration-300 ease-in-out`}
      aria-disabled={pending}
      disabled={pending}
    >
      <Trans i18nKey="login.button">Log in</Trans>
      <ArrowRightIcon className="h-5 w-5 text-gray-50 " />
    </button>
  );
}
