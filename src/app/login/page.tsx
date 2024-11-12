
import Logo from "@/components/Login/AppLogo";
import Header from "@/components/Login/Header";
import LoginForm from "@/components/Login/LoginForm";


export default function LoginPage() {

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 md:space-x-8">
      <div className="flex flex-col items-end justify-end w-full  space-y-4 md:mt-0">
        <Header />
      </div>
      <div className="flex flex-col items-center justify-center w-full max-w-md space-y-4 md:mt-0">
        <div className="flex items-center justify-center h-24 w-full rounded-lg bg-blue-500">
          <Logo />
        </div>

        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
