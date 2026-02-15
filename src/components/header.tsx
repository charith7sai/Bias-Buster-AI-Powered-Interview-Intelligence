"use client";

import Link from "next/link";
import { AppIcon } from "@/components/icons";
import { UserNav } from "@/components/auth/user-nav";
import { useUser } from "@/firebase";
import { Button } from "./ui/button";

export function Header() {
  const { user, isUserLoading } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href={user ? "/analysis" : "/"} className="flex items-center mr-auto">
          <AppIcon className="h-10" />
        </Link>
        <div className="flex items-center gap-4">
          <nav className="items-center hidden gap-6 text-sm font-medium md:flex">
            {user ? (
              <>
                <Link
                  href="/analysis"
                  className="transition-colors text-foreground/60 hover:text-foreground/80"
                >
                  Home
                </Link>
                <Link
                  href="/history"
                  className="transition-colors text-foreground/60 hover:text-foreground/80"
                >
                  History
                </Link>
              </>
            ) : null}
          </nav>
           {user && <div className="w-px h-6 bg-border hidden md:block" />}
          {isUserLoading ? (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            <UserNav />
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
