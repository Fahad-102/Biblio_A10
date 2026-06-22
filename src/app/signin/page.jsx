"use client";
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

export default function SignInPage() {
  const onSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget)
    const user = Object.fromEntries(formData.entries())
    
    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
      role: user.role.toLowerCase(),
      callbackURL: "/",
    });
    console.log({ data, error });
  };


  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", 
      });
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <Card className="border mx-auto w-125 py-10 mt-5 mb-5">
      <h1 className="text-center text-2xl font-bold">Sign In</h1>

      <Form className="flex w-96 mx-auto flex-col gap-4" onSubmit={onSubmit}>
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

        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium">Signin As</Label>
          <select
            required
            name="role"
            defaultValue="buyer"
            className="w-full bg-zinc-100 hover:bg-zinc-200 focus:bg-zinc-100 border border-zinc-200 focus:border-zinc-500 rounded-lg p-2.5 text-sm outline-none transition-all cursor-pointer"
          >
            <option value="" disabled hidden>Choose a role</option>
            <option value="librarian">Librarian</option>
            <option value="buyer">Buyer</option>
          </select>
        </div>

        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError />
        </TextField>

        <div className="flex gap-2">
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
          <Link href="/signup" >
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