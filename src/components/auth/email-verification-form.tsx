"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

import { newVerification } from "@/actions/tokens";

import FormError from "../form-error";
import FormSuccess from "../form-success";
import AuthCard from "./auth-card";

const EmailVerificationForm = () => {
  const token = useSearchParams().get("token");
  const router = useRouter();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleVerification = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Token not found");
    }
    newVerification(token!).then((data) => {
      if (data.error) {
        setError(data.error);
      }
      if (data.success) {
        setSuccess(data.success);
        router.push("/auth/login");
      }
    });
  }, []);

  useEffect(() => {
    handleVerification();
  }, []);
  return (
    <AuthCard
      cardTitle="Verify your account"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex w-full flex-col items-center justify-center">
        <p> {!success && !error ? "Verifying Email..." : null} </p>
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </AuthCard>
  );
};

export default EmailVerificationForm;
