"use client";
import React, { useState } from "react";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "../lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { toast } from "react-toastify";

export default function SignInPage() {
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    
    const id = toast.loading("Verifying your credentials...");
    
    const formData = new FormData(e.currentTarget);
    const userFormData = Object.fromEntries(formData.entries());
    const selectedRole = userFormData.role?.toLowerCase();

    await authClient.signIn.email({
      email: userFormData.email,
      password: userFormData.password,
      // callbackURL সরিয়ে হ্যান্ডলারের ভেতরে ডাইনামিক রিডাইরেক্ট করা হচ্ছে
      fetchOptions: {
        onError: (ctx) => {
          const msg = ctx.error.message || "Invalid email or password";
          setErrorMessage(msg);
          
          toast.update(id, { 
            render: msg, 
            type: "error", 
            isLoading: false, 
            autoClose: 3000 
          });
        },
        onSuccess: (ctx) => {
          // DB থেকে আসা আসল Role রিড করা হচ্ছে
          const userRole = ctx.data?.user?.role?.toLowerCase() || selectedRole || "user";

          toast.update(id, { 
            render: "Welcome back! Redirecting... 🎉", 
            type: "success", 
            isLoading: false, 
            autoClose: 1500 
          });
          
          // 🔥 Role অনুযায়ী সঠিক ড্যাশবোর্ডে Hard Redirect
          setTimeout(() => {
            if (userRole === "admin") {
              window.location.href = "/dashboard/admin";
            } else if (userRole === "librarian") {
              window.location.href = "/dashboard/librarian";
            } else {
              window.location.href = "/dashboard/user";
            }
          }, 1000);
        }
      }
    });
  };
  
  const handleGoogleSignIn = async () => {
    const id = toast.loading("Connecting to Google...");
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard/user", // ডিফল্ট রিডাইরেক্ট
      });
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.update(id, { 
        render: "Google authentication failed.", 
        type: "error", 
        isLoading: false, 
        autoClose: 3000 
      });
    }
  };

  return (
    <Card className="border mx-auto w-125 py-10 mt-5 mb-5">
      <h1 className="text-center text-2xl font-bold">Sign In</h1>

      <Form className="flex w-96 mx-auto flex-col gap-4" onSubmit={onSubmit}>
        {errorMessage && (
          <div className="p-3 bg-red-100 text-red-700 border border-red-200 rounded-lg text-sm text-center font-medium">
            ⚠️ {errorMessage}
          </div>
        )}

        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        {/* Role Select - Admin অপশন যুক্ত করা হলো */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium">Signin As</Label>
          <select
            required
            name="role"
            defaultValue="user" 
            className="w-full bg-zinc-100 hover:bg-zinc-200 focus:bg-zinc-100 border border-zinc-200 focus:border-zinc-500 rounded-lg p-2.5 text-sm outline-none transition-all cursor-pointer"
          >
            <option value="user">User</option>
            <option value="librarian">Librarian</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <FieldError />
        </TextField>

        <div className="flex justify-center gap-2">
          <Button type="submit">
            <Check />
            Submit
          </Button>
          
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>

        <div className="relative flex py-2 items-center">
          <div className="grow border-t border-zinc-200"></div>
          <span className="shrink mx-4 text-zinc-400 text-xs uppercase">OR</span>
          <div className="grow border-t border-zinc-200"></div>
        </div>
        
        <div>
          <Link href="/signup">
            <Button 
              type="button"
              variant="primary"
              className="w-full font-medium"
            >
              SignUp
            </Button>
          </Link>
        </div>

        <Button 
          type="button" 
          variant="bordered" 
          className="w-full font-medium"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle />
          Sign In with Google
        </Button>
      </Form>
    </Card>
  );
}