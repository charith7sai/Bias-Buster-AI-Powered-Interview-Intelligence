"use client";

import React, { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AppIcon } from "../icons";
import { GoogleIcon } from "./google-icon";
import { handleEmailLogin, handleEmailSignUp, handleGoogleSignIn } from "@/firebase/auth";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

const signupSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});


type AuthFormProps = {
  mode: "login" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();

  const schema = mode === "login" ? loginSchema : signupSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      ...(mode === "signup" && { confirmPassword: "" }),
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    startTransition(async () => {
      try {
        if (mode === "login") {
          await handleEmailLogin(values.email, values.password);
        } else {
          await handleEmailSignUp(values.email, values.password);
        }
        toast({
          title: mode === "login" ? "Login Successful" : "Signup Successful",
          description: "Redirecting...",
        });
        router.push("/analysis");
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Authentication Failed",
          description:
            error.message || "An unexpected error occurred. Please try again.",
        });
      }
    });
  };

  const onGoogleSignIn = async () => {
    startGoogleTransition(async () => {
      try {
        await handleGoogleSignIn();
        toast({
          title: "Google Sign-In Successful",
          description: "Redirecting...",
        });
        router.push("/analysis");
      } catch (error: any) {
         toast({
          variant: "destructive",
          title: "Google Sign-In Failed",
          description:
            error.message || "Could not sign in with Google. Please try again.",
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <AppIcon className="w-10 h-10" />
        </div>
        <CardTitle>{mode === "login" ? "Welcome Back" : "Create an Account"}</CardTitle>
        <CardDescription>
          {mode === "login" ? "Sign in to continue to Bias Buster." : "Enter your details to get started."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {mode === 'signup' && (
              <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            )}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {mode === "login" ? "Sign In" : "Create Account"}
            </Button>
          </form>
        </Form>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={onGoogleSignIn}
          disabled={isGooglePending}
        >
          {isGooglePending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <GoogleIcon className="mr-2 h-4 w-4" />
          )}
          Google
        </Button>
      </CardContent>
      <CardFooter className="text-sm text-center text-muted-foreground">
        {mode === "login" ? (
          <p>
            Don't have an account?{" "}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              Sign up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
