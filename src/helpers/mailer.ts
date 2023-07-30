import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";

export const EmailType = {
  Verify: "verify",
  Reset: "reset",
};
export async function sendEmail({ email, emailType, userId }: any) {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    if (emailType === EmailType.Verify) {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === EmailType.Reset) {
      await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: hashedToken,
        forgetPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });
    const mailOptions = {
      from: "vrinda@gmail.com",
      to: email,
      subject:
        emailType === EmailType.Verify
          ? "Verify your email ✔"
          : "Reset your password 🔑",
      html: `<p>Click <a href="${process.env.DOMAIN}/${
        emailType === EmailType.Verify ? "verifyEmail" : "resetPassword"
      }?token=${hashedToken}">here</a> to ${
        emailType === EmailType.Verify
          ? "Verify your email ✔"
          : "Reset your password"
      } or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/${
        emailType === EmailType.Verify ? "verifyEmail" : "resetPassword"
      }?token=${hashedToken} </p>`,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
