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
        <Link href="/" className="flex items-center gap-2 mr-auto">
          <AppIcon className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold tracking-tight">
            Bias<span className="text-primary">Buster</span>
          </h1>
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
            ) : (
              <>
                <Link
                  href="/#features"
                  className="transition-colors text-foreground/60 hover:text-foreground/80"
                >
                  Features
                </Link>
                <Link
                  href="/#faq"
                  className="transition-colors text-foreground/60 hover:text-foreground/80"
                >
                  FAQ
                </Link>
              </>
            )}
          </nav>
           <div className="w-px h-6 bg-border hidden md:block" />
          {isUserLoading ? (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            <UserNav />
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
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
