"use client";

import Link from "next/link";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { emailRegister } from "@/actions/email-register";
import { emailSignIn } from "@/actions/email-signin";
import { RegisterSchema } from "@/types/register-schema";

import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import AuthCard from "./auth-card";

const RegisterForm = () => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { execute, result, status } = useAction(emailRegister, {
    onSuccess(data) {
      if (data.data?.error) {
        setError(data.data?.error);
      }
      if (data.data?.success) {
        setSuccess(data.data?.success);
      }
    },
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    execute(values);
  };

  return (
    <>
      <AuthCard
        cardTitle="Create an account"
        backButtonHref="/auth/login"
        backButtonLabel="Already have an account?"
        showSocials={true}
      >
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="name" type="text" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="email"
                          type="email"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription />
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
                        <Input
                          placeholder="********"
                          type="password"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormSuccess message={success} />
                <FormError message={error} />
                <Button size={"sm"} variant={"link"} asChild>
                  <Link href="/auth/reset">Forgot your password ?</Link>
                </Button>
              </div>
              <Button
                type="submit"
                className={cn(
                  "my-2 w-full",
                  status === "executing" ? "animate-pulse" : "",
                )}
              >
                {"Register"}
              </Button>
            </form>
          </Form>
        </div>
      </AuthCard>
    </>
  );
};

export default RegisterForm;
