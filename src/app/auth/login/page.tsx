import { redirect } from "next/navigation";
import React from "react";

import LoginForm from "@/components/auth/login-form";

import { auth } from "@/auth";

const Login = async () => {
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col justify-between p-4">
      <LoginForm />
    </main>
  );
};

export default Login;
