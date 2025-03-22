"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Home, LayoutDashboard } from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { ThemeToggle } from "./ThemeToggle"

export function Navbar() {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();

  return (
    <nav className="py-5 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center">
          <div className="bg-[#0000] p-3 rounded-lg">
            <div className="flex flex-col items-center">
              <span className="text-[#ff0000b0] dark:text-[#f5f5dc] text-xl font-bold tracking-wider transition-colors duration-300">FOKA</span>
              <span className="text-[#ff0000b0] dark:text-[#f5f5dc] text-xl font-bold tracking-wider transition-colors duration-300">BOOK</span>
              <span className="text-[#ff0000b0] dark:text-[#f5f5dc] text-xl font-bold tracking-wider transition-colors duration-300">CLUB</span>
            </div>
          </div>
        </Link>

        <div className="hidden sm:flex items-center gap-6">
          <Link
            className="text-sm font-medium hover:text-[#ff0000b0] dark:hover:text-white dark:hover:font-bold transition-all duration-300"
            href="/"
          >
            Home
          </Link>
          <Link
            className="text-sm font-medium hover:text-[#ff0000b0] dark:hover:text-white dark:hover:font-bold transition-all duration-300"
            href="/Dashboard"
          >
            Dashboard
          </Link>
        </div>

        <div className="flex sm:hidden items-center gap-4">
  <Link
    href="/"
    className="p-2 hover:text-[#ff0000b0] dark:hover:text-white dark:hover:font-bold transition-all duration-500 ease-in-out"
    title="Home"
  >
    <Home size={20} />
  </Link>
  <Link
    href="/Dashboard"
    className="p-2 hover:text-[#ff0000b0] dark:hover:text-white dark:hover:font-bold transition-all duration-500 ease-in-out"
    title="Dashboard"
  >
    <LayoutDashboard size={20} />
  </Link>
</div>

      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        {user ? (
          <div className="flex items-center gap-4">
            <p className="text-[#ff0000b0] dark:text-white transition-colors duration-300">{user.given_name}</p>
            <LogoutLink className={buttonVariants({ 
              variant: "secondary",
              className: "hover:text-[#ff0000b0] dark:hover:text-white dark:hover:font-bold transition-all duration-300"
            })}>
              Logout
            </LogoutLink>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <LoginLink className={buttonVariants({
              className: "hover:text-[#ff0000b0] dark:hover:text-white dark:hover:font-bold transition-all duration-300"
            })}>Login</LoginLink>
            <RegisterLink className={buttonVariants({ 
              variant: "secondary",
              className: "hover:text-[#ff0000b0] dark:hover:text-white dark:hover:font-bold transition-all duration-300"
            })}>
              Sign up
            </RegisterLink>
          </div>
        )}
      </div>
    </nav>
  );
}