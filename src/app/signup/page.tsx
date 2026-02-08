"use client";

import { AuthForm } from "@/components/auth/auth-form";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <div className="w-full max-w-md">
        <AuthForm mode="signup" />
      </div>
    </div>
  );
}
