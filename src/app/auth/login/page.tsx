"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { SignInResponse, signIn } from "next-auth/react";
import { useState } from "react";

type loginForm = {
  email: string;
  password: string;
};

function LoginPage() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginForm>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      console.log(res);

      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-1/4">
        <h1 className="text-slate-200 font-bold text-4xl mb-6">Login</h1>

        {error && (
          <p className="bg-red-500 text-white p-2 rounded mb-2 text-center">
            {error}
          </p>
        )}

        <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
          Email:
        </label>
        <input
          type="text"
          {...register("email", {
            required: { value: true, message: "Email is required" },
          })}
          placeholder="user@email.com"
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.email && (
          <span className="text-red-500 mb-2 block">
            {errors.email.message}
          </span>
        )}

        <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
          Password:
        </label>
        <input
          type="password"
          {...register("password", {
            required: { value: true, message: "Password is required" },
          })}
          placeholder="Password"
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.password && (
          <span className="text-red-500 mb-2 block">
            {errors.password.message}
          </span>
        )}

        <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">
          Sign up
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
