import * as React from "react";

import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface ResetPasswordEmailProps {
  email?: string;
  resetPasswordLink?: string;
}

const ResetPasswordEmail = ({
  email,
  resetPasswordLink,
}: ResetPasswordEmailProps) => {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>Lerna Med reset your password</Preview>
        <Body className="bg-white px-0 py-3">
          <Container className="border border-gray-100 bg-white p-11">
            <Img src="" width="40" height="33" alt="Lerna Med" />
            <Section>
              <Text className="font-sans text-base font-light leading-7 text-gray-700">
                {email},
              </Text>
              <Text className="font-sans text-base font-light leading-7 text-gray-700">
                Someone recently requested a password change for your Lerna Med
                account. If this was you, you can set a new password here:
              </Text>
              <Button
                className="block w-52 rounded bg-blue-500 px-2 py-3.5 text-center font-sans text-sm text-white no-underline"
                href={resetPasswordLink}
              >
                Reset password
              </Button>
              <Text className="font-sans text-base font-light leading-7 text-gray-700">
                If you don&apos;t want to change your password or didn&apos;t
                request this, just ignore and delete this message.
              </Text>
              <Text className="font-sans text-base font-light leading-7 text-gray-700">
                To keep your account secure, please don&apos;t forward this
                email to anyone. See our Help Center for{" "}
                <Link className="underline" href="https://lerna-med.com">
                  more security tips.
                </Link>
              </Text>
              <Text className="font-sans text-base font-light leading-7 text-gray-700">
                Happy Learning!
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

ResetPasswordEmail.PreviewProps = {
  email: "Name",
  resetPasswordLink: "https://lerna-med.com",
} as ResetPasswordEmailProps;

export default ResetPasswordEmail;
