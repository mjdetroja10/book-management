"use client";

import { InputController } from "@/Application/controllers/InputController";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

const handleSignIn = (router, setError) => async (data) => {
  let res = await signIn("credentials", {
    ...data,
    redirect: false,
  });

  if (res.status === 200) router.push("/");
  if (res.error) {
    let errors = res.error.startsWith("[") && res.error.endsWith("]") ? JSON.parse(res.error) : res.error;
    if (errors && Array.isArray(errors)) {
      errors.forEach((x) => {
        setError(x.path, { type: x.type, message: x.msg });
      });
    }
  }
};

export const SignIn = () => {
  const methods = useForm({ defaultValues: { email: "", password: "" } });
  const { handleSubmit, setError } = methods;

  const router = useRouter();

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleSignIn(router, setError))}>
        <div className="h-screen flex justify-center items-center flex-col">
          <div className="md:w-[600px] border-2 border-gray-300 px-10 py-20">
            <div className=" p-2">
              <InputController name="email" placeholder="enter your email..." />
            </div>
            <div className="p-2">
              <InputController name="password" placeholder="enter your password..." />
            </div>
            <div className=" text-center">
              <button
                type="submit"
                className="bg-black text-white border-2 border-black p-2 rounded-md  hover:bg-white hover:text-black"
              >
                Sign in using Crediantials
              </button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
