"use server";

import { revalidatePath } from "next/cache";

import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { createSafeActionClient } from "next-safe-action";

import { users } from "@/db/schema";

import { auth } from "@/auth";
import db from "@/db";
import { SettingsSchema } from "@/types/settings-schema";

const actionClient = createSafeActionClient();

export const settings = actionClient
  .schema(SettingsSchema)
  .action(
    async ({
      parsedInput: {
        name,
        email,
        password,
        newPassword,
        image,
        isTwoFactorEnabled,
      },
    }) => {
      const user = await auth();

      if (!user) {
        return { error: "User not found" };
      }

      const dbUser = await db.query.users.findFirst({
        where: eq(users.id, user.user?.id),
      });

      if (!dbUser) {
        return { error: "User not found" };
      }

      if (user.user.isOAuth) {
        (email = undefined),
          (password = undefined),
          (newPassword = undefined),
          (isTwoFactorEnabled = undefined);
      }

      if (password && newPassword && dbUser.password) {
        const passwordMatch = await bcrypt.compare(password, dbUser.password);

        if (!passwordMatch) {
          return { error: "Password does not match" };
        }

        const samePassword = await bcrypt.compare(newPassword, dbUser.password);
        if (samePassword) {
          return { error: "New password is same as the old password" };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        password = hashedPassword;
        newPassword = undefined;
      }
      const updatedUser = await db
        .update(users)
        .set({
          name: name,
          password: password,
          email: email,
          image: image,
          twoFactorEnabled: isTwoFactorEnabled,
        })
        .where(eq(users.id, dbUser.id));

      revalidatePath("/dashboard/settings");
      return { success: "Settings updated" };
    },
  );
