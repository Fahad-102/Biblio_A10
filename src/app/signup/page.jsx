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
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      name: user?.name,
      email: user?.email,
      password: user?.password,
      image: user?.image,
      role: user?.role.toLowerCase(),
      plan: 'free',
    }, {
      onSuccess: () => {
        router.push("/signin");
      }
    });

    console.log({ data, error });
  };

  const handleGoogleSignUp = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="border mx-auto w-125 py-10 mt-5 mb-5">
      <h1 className="text-center text-2xl font-bold">Sign Up</h1>

      <Form className="flex w-96 mx-auto flex-col gap-4" onSubmit={onSubmit}>
        <TextField isRequired name="name" type="text">
          <Label>Name</Label>
          <Input placeholder="Enter your name" />
          <FieldError />
        </TextField>

        <TextField isRequired name="image" type="text">
          <Label>Image URL</Label>
          <Input placeholder="Image URL" />
          <FieldError />
        </TextField>

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
          <Input placeholder="Enter your Email" />
          <FieldError />
        </TextField>

        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium">Signup As</Label>
          <select
            required
            name="role"
            defaultValue="user"
            className="w-full bg-zinc-100 hover:bg-zinc-200 focus:bg-zinc-100 border border-zinc-200 focus:border-zinc-500 rounded-lg p-2.5 text-sm outline-none transition-all cursor-pointer"
          >
            <option value="" disabled hidden>Choose a role</option>
            <option value="librarian">Librarian</option>
            <option value="user">User</option>
          </select>
        </div>

        <TextField
          required
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
          <Input placeholder="Enter your password" type="password" />
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

        <Button 
          type="button" 
          variant="bordered" 
          className="w-full font-medium"
          onClick={handleGoogleSignUp}
        >
          <FcGoogle />
          Sign Up with Google
        </Button>
      </Form>
    </Card>
  );
}