"use client";
import { lusitana } from "@/app/ui/fonts";
import i18n from "@/lib/i18n";
import { useAppStore } from "@/store/appStore";
import { ArrowRightIcon, AtSymbolIcon, KeyIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { Trans } from "react-i18next";
import Swal from "sweetalert2";

const RegisterForm = () => {
    const { createUser, language } = useAppStore();
    const [error, setError] = useState("");
    const router = useRouter();

    const [userData, setUserData] = useState({
        id:0,
        email: "",
        name: "",
        image: "",
        password: "",
        confirmPassword: "",
      });
      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
      
        if (userData.password !== userData.confirmPassword) {
          setError("Passwords do not match.");
          return;
        }
      
        try {
          const newUser = {
            id: Date.now(),
            email: userData.email,
            name: userData.name,
            image: "/images/avatars/hombre.jpg",
            password: userData.password,
          };
      
          
          createUser(newUser);
      
          Swal.fire({
            title: "Registro exitoso",
            text: "El usuario ha sido registrado con éxito.",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          
          setUserData({ id: 0, email: "", name: "", image: "", password: "", confirmPassword: "" });
          router.push("/login");
        } catch (error) {
          console.error("Error al registrar el usuario:", error);
          setError(error instanceof Error ? error.message : "Error al registrar el usuario.");
        }
      };
      
      useEffect(() => {
        i18n.changeLanguage(language);
      }, [language]);

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h1 className={`${lusitana.className} mb-3 text-xl text-black`}>
            <Trans i18nKey="login.presentationRegister">
            Welcome to the task application. Please create an account to continue.
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
                htmlFor="name"
              >
                <Trans i18nKey="login.labelName">Name</Trans>
              </label>
              <div className="relative">
                <input
                  className="peer text-black block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="name"
                  type="text"
                  name="name"
                  value={userData.name}
                  placeholder="Enter your name"
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  required
                />
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
                  className="peer text-black block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
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
              </div>
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                <Trans i18nKey="login.labelConfirmPassword">
                  Confirm Password
                </Trans>
              </label>
              <div className="relative">
                <input
                  className="peer text-black block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="confirmPassword"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={userData.confirmPassword}
                  onChange={(e) =>
                    setUserData({ ...userData, confirmPassword: e.target.value })
                  }
                  required
                  minLength={6}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div>
                <p className="text-red-500 text-sm">{error}</p>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <RegisterButton />
          </div>
        </div>
      </form>
  );
}
   

export default RegisterForm 

function RegisterButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className={`${
        pending ? "bg-blue-300" : "bg-blue-500"
      } flex items-center justify-center rounded-md py-2 mt-4 w-full text-white hover:bg-blue-400 shadow-md shadow-blue-500/50 transition-all duration-300 ease-in-out gap-1`}
      aria-disabled={pending}
      disabled={pending}
    >
      <Trans i18nKey="login.buttonRegister">
        Register 
      </Trans>
      <ArrowRightIcon className="h-5 w-5 text-gray-50 " />
    </button>
  );
}