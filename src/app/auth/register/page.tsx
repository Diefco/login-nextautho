"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type RegisterForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      return console.error("Passwords do not match");
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        router.push("/auth/login");
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-1/4">
        <h1 className="text-slate-200 font-bold text-4xl mb-6">Register</h1>

        <label htmlFor="username" className="text-slate-500 mb-2 block text-sm">
          Username:
        </label>
        <input
          type="text"
          {...register("username", {
            required: { value: true, message: "Username is required" },
          })}
          placeholder="Username"
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.username && (
          <span className="text-red-500 mb-2 block">
            {errors.username.message}
          </span>
        )}

        <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
          Email:
        </label>
        <input
          type="email"
          {...register("email", {
            required: { value: true, message: "Email is required" },
          })}
          placeholder="Email"
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

        <label
          htmlFor="confirmPassword"
          className="text-slate-500 mb-2 block text-sm"
        >
          Confirm Password:
        </label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: { value: true, message: "Confirm password is required" },
          })}
          placeholder="Confirm password"
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 mb-2 block">
            {errors.confirmPassword.message}
          </span>
        )}

        <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">
          Sign up
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
