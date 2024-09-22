"use server";

import { Pool } from "@neondatabase/serverless";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-serverless";
import { createSafeActionClient } from "next-safe-action";

import { db } from "@/db/drizzle";
import { passwordResetTokens, users } from "@/db/schema/authSchema";

import { NewPasswordSchema } from "@/types/new-password-schema";

import { getPasswordResetTokenByToken } from "./tokens";

config({ path: ".env.local" });

const actionClient = createSafeActionClient();
const pool = new Pool({ connectionString: process.env.NEON_DATABASE_URL });
const dbPool = drizzle(pool);

export const newPassword = actionClient
  .schema(NewPasswordSchema)
  .action(async ({ parsedInput: { password, token } }) => {
    if (!token) {
      return { error: "Missing token" };
    }

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
      return { error: "Token not found" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
      return { error: "Token has expired" };
    }

    const existingUser = db.query.users.findFirst({
      where: eq(users.email, existingToken.email),
    });

    if (!existingUser) {
      return { error: "User not found" };
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await dbPool.transaction(async (tx) => {
      await tx
        .update(users)
        .set({
          password: hashedPassword,
        })
        .where(eq(users.email, existingToken.email));

      await tx
        .delete(passwordResetTokens)
        .where(eq(passwordResetTokens.email, existingToken.email));
    });
    return { success: "Password updated" };
  });
