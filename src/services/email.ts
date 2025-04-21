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
  try {
    const { subject, html } = BaseEmailTemplate({
      emailType,
      props,
    });
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
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
  } catch (error: any) {
    throw new Error(error.message);
  }
};
