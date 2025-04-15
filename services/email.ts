// Packages
import nodemailer from "nodemailer";

// Templates
import { BaseEmailTemplate } from "../templates/email";

// Utils
import { EmailProps, EmailType } from "../utils/types";

interface SendEmailProps {
  to: string;
  emailType: EmailType;
  props: EmailProps;
}

export const sendEmail = async ({
  to,
  emailType,
  props,
}: SendEmailProps): Promise<void> => {
  const { subject, html } = BaseEmailTemplate({
    emailType,
    props,
  });
  console.log(process.env.EMAIL_USER);
  console.log(process.env.EMAIL_PASSWORD);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};
