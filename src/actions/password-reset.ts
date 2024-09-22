"use server";

import { eq } from "drizzle-orm";
import { createSafeActionClient } from "next-safe-action";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema/authSchema";

import { ResetSchema } from "@/types/reset-schema";

import { sendPasswordResetEmail } from "./email";
import { generatePasswordResetToken } from "./tokens";

const actionClient = createSafeActionClient();

export const passwordReset = actionClient
  .schema(ResetSchema)
  .action(async ({ parsedInput: { email } }) => {
    const existingUser = db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!existingUser) {
      return { error: "User not found" };
    }

    const passwordResetToken = await generatePasswordResetToken(email);

    await sendPasswordResetEmail(
      passwordResetToken[0].email,
      passwordResetToken[0].token,
    );

    return { success: "Password reset email sent" };
  });
