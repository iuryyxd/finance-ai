"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./mobile-menu";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between border-b border-solid px-8 py-4 md:justify-normal">
      <Image
        src="/logo.svg"
        width={133}
        height={39}
        alt="finance ai"
        className="mr-10"
      />
      <div className="hidden items-center justify-between md:flex md:flex-1">
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/"
            className={
              pathname === "/"
                ? "font-bold text-primary"
                : "text-muted-foreground"
            }
          >
            Dashboard
          </Link>
          <Link
            href="/transactions"
            className={
              pathname === "/transactions"
                ? "font-bold text-primary"
                : "text-muted-foreground"
            }
          >
            Transações
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <MobileMenu />
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
