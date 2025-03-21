import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function Navbar() {
    const {getUser} = getKindeServerSession()
    const user = await getUser()
  return (
    <nav className="py-5 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href={"/"}>
          {" "}
          <h1 className=" text-5xl font-bold">
            Blog<span className="text-blue-500">Marshal</span>
          </h1>
        </Link>

        <Link
          href={"/"}
          className="text-2xl font-medium hover:text-blue-500 transition-colors"
        >
          Home
        </Link>
        <Link
          href={"/Dashboard"}
          className="text-2xl font-medium hover:text-blue-500 transition-colors"
        >
          Dashboard
        </Link>
      </div>
 { user ? (
    <div className="flex items-center gap-6">
        {/* <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full" />
        <p className="text-xl font-medium">{user.name}</p> */}
        <LogoutLink className={buttonVariants({variant: "secondary"})}>Logout</LogoutLink>
        </div>
      ) : (
        <div className="flex items-center gap-6">
        <RegisterLink className={buttonVariants()}>Sign up</RegisterLink>
        <LoginLink className={buttonVariants({ variant: "secondary" })}>
          Sign in
        </LoginLink>
      </div>
 )}
   
    </nav>
  );
}
