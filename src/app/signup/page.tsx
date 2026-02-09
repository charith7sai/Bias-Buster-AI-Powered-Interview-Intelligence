"use client";

import { AuthForm } from "@/components/auth/auth-form";
import { AuthLayout } from "@/components/auth/auth-layout";

export default function SignUpPage() {
  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <AuthForm mode="signup" />
      </div>
    </AuthLayout>
  );
}
