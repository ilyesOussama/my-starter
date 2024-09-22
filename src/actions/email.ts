"use server";
import ResetPasswordEmail from "./../emails/reset-password";

import getBaseUrl from "@/lib/base-url";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = getBaseUrl();

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Sprout-Scribble Email Confirmation",
    react: ResetPasswordEmail({
      email,
      resetPasswordLink: confirmLink,
    }),
  });
  if (error) {
    return console.log(error);
  }
  if (data) {
    return data;
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-password?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Lerna Password Reset",
    react: ResetPasswordEmail({
      email,
      resetPasswordLink: confirmLink,
    }),
  });
  if (error) {
    return console.log(error);
  }
  if (data) {
    return data;
  }
};

export const sendTwoFactorTokenByEmail = async (
  email: string,
  token: string
) => {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Sprout-Scribble Your two factor token",
    html: `<p>Your confirmation code is '${token}'</p>`,
  });
  if (error) {
    return console.log(error);
  }
  if (data) {
    return data;
  }
};
