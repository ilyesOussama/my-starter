"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { emailSignIn } from "@/actions/email-signin";
import { newPassword } from "@/actions/new-password";
import LoginSchema from "@/types/login-schema";
import { NewPasswordSchema } from "@/types/new-password-schema";

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

const NewPasswordForm = () => {
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { execute, result, status } = useAction(newPassword, {
    onSuccess(data) {
      if (data.data?.error) {
        setError(data?.data?.error);
      }
      if (data?.data?.success) {
        setSuccess(data?.data.success);
      }
    },
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    execute({ password: values.password, token });
  };

  return (
    <>
      <AuthCard
        cardTitle="Enter a new Password"
        backButtonHref="/auth/login"
        backButtonLabel="Back to login"
        showSocials={true}
      >
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div>
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
                          disabled={status === "executing"}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button size={"sm"} variant={"link"} asChild>
                  <Link href="/auth/reset">Forgot your password ?</Link>
                </Button>
              </div>
              <FormSuccess message={success} />
              <FormError message={error} />
              <Button
                type="submit"
                className={cn(
                  "my-2 w-full",
                  status === "executing" ? "animate-pulse" : "",
                )}
              >
                {"Reset Password"}
              </Button>
            </form>
          </Form>
        </div>
      </AuthCard>
    </>
  );
};

export default NewPasswordForm;
