"use client";
import Spinner from "@/components/Spinner";
import { createCookie } from "@/components/utils/cookies";
import { Login, login } from "@/components/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<Login>({
    mode: "all",
    resolver: zodResolver(login),
  });
  const onSubmit = handleSubmit(async (data) => {
    setMessage("");
    setError(false);
    setLoading(true);
    const auth = await fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    try {
      if (!auth.ok) {
        setError(true);

        const res = await auth.json();
        console.log(res);
        setMessage(res.message);
        setLoading(false);
        createCookie("teste");
        return;
      }
      const res = await auth.json();

      setTimeout(() => {
        createCookie(res.token);

        setLoading(false);
        reset();
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      console.log(error);
    }

    return;
  });

  if (loading) {
    return (
      <section className=" w-full h-screen  relative flex flex-col items-center justify-center gap-4">
        <div>
          <Spinner />
        </div>

        <p className="text-base text-gray">Aguarde authenticando ...</p>
      </section>
    );
  }

  return (
    <section className="w-full h-screen  relative flex items-center justify-center">
      <img
        src="/bglogin.jpg"
        alt=""
        className="w-full h-full object-fill absolute top-0 bottom-0 left-0 right-0  brightness-50"
      />
      <form
        method="POST"
        onSubmit={onSubmit}
        className="w-[400px] h-[450px] bg-[#005183] bg-opacity-60 z-50 absolute  flex flex-col items-center justify-center rounded-md gap-4"
      >
        <div className="">
          <img
            src="/logo.png"
            alt="logo"
            className="w-28 h-28 rounded-full object-cover"
          />
        </div>
        <h1 className="font-bold text-white">LOGIN</h1>
        <div className="flex flex-col w-[70%] gap-1">
          <label htmlFor="" className="text-white">
            Email
          </label>
          <input
            {...register("email")}
            type="text"
            placeholder="Digite seu email"
            className=" outline-none pl-1 rounded-md py-2"
          />
          {errors.email && (
            <p className="text-base text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col w-[70%] gap-1">
          <label htmlFor="" className="text-white">
            Password
          </label>
          <input
            {...register("password")}
            type="text"
            placeholder="Digite seu senha"
            className=" outline-none pl-1 rounded-md py-2 "
          />
          {errors.password && (
            <p className="text-base text-red-500">{errors.password.message}</p>
          )}
        </div>
        {error && <p className="text-xl text-red-500 ">{message}</p>}
        <button
          type="submit"
          className="px-8 py-2 mt-2 bg-[#00456a] rounded-md border-[1px] border-white text-white "
        >
          ENTRAR
        </button>
      </form>
    </section>
  );
};

export default Login;
