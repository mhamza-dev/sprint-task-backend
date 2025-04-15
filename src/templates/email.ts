// ------------------ Imports ------------------
import {
  BaseEmailTemplateProps,
  EmailProps,
  EmailTemplate,
  EmailType,
  OtpVerificationProps,
  PasswordResetProps,
  TaskAssignmentProps,
  WelcomeUserProps,
} from "../utils/types";
import path from "path";
import fs from "fs";

// ------------------ Asset Configuration ------------------
const logoPath = path.join(__dirname, "../assets/logo.png");
const logoBase64 = fs.readFileSync(logoPath, { encoding: "base64" });
const logoUrl = `data:image/png;base64,${logoBase64}`;

// ------------------ Styles ------------------

const baseStyles = {
  body: "font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;",
  container: "max-width: 600px; margin: 0 auto; padding: 20px;",
  header:
    "background: #8875FF; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;",
  headerTitle: "color: white; margin: 0; font-size: 24px;",
  content:
    "background: #fff; padding: 30px; border-left: 1px solid #eee; border-right: 1px solid #eee;",
  footer:
    "background: #f8f7ff; padding: 20px; text-align: center; font-size: 14px; color: #666; border-radius: 0 0 8px 8px; border-top: 3px solid #8687E7;",
  button:
    "display: inline-block; background-color: #5D49D6; color: white; text-decoration: none; padding: 12px 30px; border-radius: 4px; font-weight: bold; margin: 20px 0; text-align: center;",
  paragraph: "margin-bottom: 15px;",
  link: "color: #8875FF; text-decoration: none;",
  logo: "width: 120px; height: auto; margin-bottom: 15px; display: block; margin: 0 auto;",
  highlight:
    "background: #f8f7ff; border-left: 4px solid #8687E7; padding: 15px; margin: 20px 0; border-radius: 4px;",
  codeBox:
    "background: #f8f7ff; border: 2px solid #8687E7; border-radius: 8px; padding: 15px; margin: 20px 0; text-align: center;",
  infoBox:
    "background: #f8f7ff; border: 1px solid #8687E7; border-radius: 8px; padding: 20px; margin: 20px 0;",
  divider: "border-top: 1px solid #eee; margin: 20px 0;",
  emphasis: "color: #5D49D6; font-weight: 600;",
};

// ------------------ Email Template Builders ------------------

const emailTemplates = {
  [EmailType.OTP_VERIFICATION]: ({
    otpCode,
  }: OtpVerificationProps): EmailTemplate => ({
    subject: "Your Verification Code",
    html: `
      <div style="${baseStyles.header}">
        <img src="${logoUrl}" alt="Logo" style="${baseStyles.logo}" />
        <h1 style="${baseStyles.headerTitle}">Verify Your Email</h1>
      </div>
      <div style="${baseStyles.content}">
        <p style="${baseStyles.paragraph}">Hello! 👋</p>
        <p style="${baseStyles.paragraph}">Thank you for getting started with our service. To ensure the security of your account, please use the verification code below:</p>
        <div style="${baseStyles.codeBox}">
          <div style="font-size: 32px; letter-spacing: 8px; color: #5D49D6; font-weight: bold;">${otpCode}</div>
        </div>
        <div style="${baseStyles.highlight}">
          <p style="margin: 0; color: #666;">
            <span style="${baseStyles.emphasis}">⏰ Important:</span> This code will expire in 10 minutes for security reasons.
          </p>
        </div>
        <p style="${baseStyles.paragraph}">If you didn't request this code, please ignore this email.</p>
      </div>
    `,
  }),

  [EmailType.PASSWORD_RESET]: ({
    resetLink,
  }: PasswordResetProps): EmailTemplate => ({
    subject: "Password Reset Request",
    html: `
      <div style="${baseStyles.header}">
        <img src="${logoUrl}" alt="Logo" style="${baseStyles.logo}" />
        <h1 style="${baseStyles.headerTitle}">Reset Your Password</h1>
      </div>
      <div style="${baseStyles.content}">
        <p style="${baseStyles.paragraph}">Hello! 👋</p>
        <p style="${baseStyles.paragraph}">We received a request to reset your password. Don't worry, we're here to help!</p>
        <div style="${baseStyles.highlight}">
          <p style="margin: 0;">
            <span style="${baseStyles.emphasis}">🔒 Security Note:</span> This link will expire in 24 hours.
          </p>
        </div>
        <a href="${resetLink}" style="${baseStyles.button}">Reset Password</a>
        <div style="${baseStyles.divider}"></div>
        <p style="${baseStyles.paragraph}">Or copy and paste this link in your browser:</p>
        <p style="word-break: break-word; font-size: 14px; color: #5D49D6; background: #f8f7ff; padding: 10px; border-radius: 4px;">${resetLink}</p>
        <p style="font-size: 14px; color: #666;">If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
      </div>
    `,
  }),

  [EmailType.WELCOME_USER]: ({
    username,
  }: WelcomeUserProps): EmailTemplate => ({
    subject: "Welcome to Our Platform",
    html: `
      <div style="${baseStyles.header}">
        <img src="${logoUrl}" alt="Logo" style="${baseStyles.logo}" />
        <h1 style="${baseStyles.headerTitle}">Welcome Aboard! 🎉</h1>
      </div>
      <div style="${baseStyles.content}">
        <p style="font-size: 18px; color: #5D49D6; font-weight: bold;">Hello ${username}! 👋</p>
        <p style="${baseStyles.paragraph}">We're absolutely thrilled to have you join our community. Get ready to experience a new way of managing your tasks and boosting your productivity!</p>
        
        <div style="${baseStyles.highlight}">
          <h3 style="margin-top: 0; color: #5D49D6;">🚀 Quick Start Guide</h3>
          <ul style="list-style-type: none; padding-left: 0; margin: 0;">
            <li style="margin-bottom: 10px;">✨ Complete your profile</li>
            <li style="margin-bottom: 10px;">📋 Create your first task</li>
            <li style="margin-bottom: 10px;">🤝 Collaborate with team members</li>
            <li style="margin-bottom: 0;">📱 Download our mobile app</li>
          </ul>
        </div>
        
        <div style="${baseStyles.infoBox}">
          <h3 style="margin-top: 0; color: #5D49D6;">💡 Pro Tips</h3>
          <p style="${baseStyles.paragraph}">Check out our getting started guide to make the most of your experience.</p>
          <a href="#" style="${baseStyles.button}">Explore Dashboard</a>
        </div>
      </div>
    `,
  }),

  [EmailType.TASK_ASSIGNMENT]: ({
    taskName,
    assignedBy,
  }: TaskAssignmentProps): EmailTemplate => ({
    subject: "New Task Assignment",
    html: `
      <div style="${baseStyles.header}">
        <img src="${logoUrl}" alt="Logo" style="${baseStyles.logo}" />
        <h1 style="${baseStyles.headerTitle}">New Task Assigned 📋</h1>
      </div>
      <div style="${baseStyles.content}">
        <p style="${
          baseStyles.paragraph
        }">You have a new task waiting for your attention!</p>
        
        <div style="${baseStyles.infoBox}">
          <div style="font-size: 20px; color: #5D49D6; font-weight: bold; margin-bottom: 15px;">
            ✨ ${taskName}
          </div>
          <div style="${baseStyles.divider}"></div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; font-size: 14px;">
            <div>
              <p style="margin: 0; color: #666;">👤 Assigned by</p>
              <p style="margin: 5px 0; font-weight: 600;">${assignedBy}</p>
            </div>
            <div>
              <p style="margin: 0; color: #666;">📅 Date Assigned</p>
              <p style="margin: 5px 0; font-weight: 600;">${new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div style="${baseStyles.highlight}">
          <p style="margin: 0;">
            <span style="${
              baseStyles.emphasis
            }">⏰ Reminder:</span> Quick responses help keep projects moving forward!
          </p>
        </div>
        
        <a href="#" style="${baseStyles.button}">View Task Details</a>
      </div>
    `,
  }),
};

// ------------------ Wrapper and Utility ------------------

function wrapWithTemplate(subject: string, contentHtml: string): EmailTemplate {
  const currentYear = new Date().getFullYear();
  const companyName = "Task Sprint";

  return {
    subject,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${subject}</title>
        </head>
        <body style="${baseStyles.body}">
          <div style="${baseStyles.container}">
            ${contentHtml}
          </div>
          <footer style="${baseStyles.footer}">
            <p style="${baseStyles.paragraph}">© ${currentYear} ${companyName}. All rights reserved.</p>
          </footer>
        </body>
      </html>
    `,
  };
}

function getEmailTemplate<T extends EmailProps>(
  emailType: EmailType,
  props: T
): EmailTemplate {
  const builder = emailTemplates[emailType] as (props: T) => EmailTemplate;
  return builder(props);
}

// ------------------ Exported API ------------------

export function BaseEmailTemplate<T extends EmailProps>({
  emailType,
  props,
}: BaseEmailTemplateProps<T>): EmailTemplate {
  const { subject, html } = getEmailTemplate(emailType, props);
  return wrapWithTemplate(subject, html);
}
