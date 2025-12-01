"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import HeaderLayout from "@/layouts/HeaderLayout";
import { Eye, EyeOff } from "lucide-react";

// Zod validation schema
const signinSchema = z.object({
  identifier: z
    .string()
    .min(3, "Enter a valid email or username")
    .refine(
      (val) => val.includes("@") || /^[a-zA-Z0-9_]+$/.test(val),
      "Must be a valid email or username"
    ),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SigninSchema = z.infer<typeof signinSchema>;

function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninSchema>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = (data: SigninSchema) => {
    console.log("Form Data:", data);

    login(data.identifier);
    navigate("/home");
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="w-full min-w-3xs">
        <HeaderLayout
          headerRight={
            <Link to="/signup">
              <Button
                variant="outline"
                className="text-blue-500 bg-blue-100 font-semibold hover:bg-green-200/90 hover:text-green-700"
              >
                Sign Up
              </Button>
            </Link>
          }
        />
      </div>

      <main className="flex-1 flex items-center justify-center w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col gap-4 bg-white p-5 rounded-lg shadow-lg inset-shadow-2xs max-w-sm w-80">
            <div className="flex flex-col items-center w-full">
              <h1 className="text-3xl tracking-wide font-bold ">Welcome</h1>
              <p className="text-xs text-center py-1">
                Log in to manage your appointments.
              </p>
            </div>

            {/* Email/ Username */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium" htmlFor="identifier">
                Email or Username
              </Label>

              <Input
                id="identifier"
                type="text"
                placeholder="Enter your email or username"
                className="p-2 border border-gray-400 rounded focus:border-b-gray-500"
                {...register("identifier")}
              />
              {errors.identifier && (
                <p className="text-sm text-red-500">
                  {errors.identifier.message}
                </p>
              )}
            </div>

            {/* Password input with toggle */}
            <div className="space-y-2">
              <Label className="text-sm font-medium" htmlFor="password">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="*******"
                  className="pr-10 border border-gray-400 rounded focus:border-b-gray-500"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className=" absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot password */}
            <div className="text-right text-xs text-blue-600 hover:text-green-700 hover:underline">
              <Link to="/forgot-password">Forgot your password?</Link>
            </div>

            {/* Login button */}
            <button
              // onClick={handleLogin}
              type="submit"
              className="bg-blue-500 text-white font-semibold p-2 rounded hover:bg-green-200/90 hover:text-green-700"
            >
              Login
            </button>

            {/* Sign up prompt */}
            <div className="text-center text-xs">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:underline hover:text-green-700"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default SignIn;
