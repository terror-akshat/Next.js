import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //hasedToken
    const hasedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifiedToken: hasedToken,
        verifiedTokenExpires: Date.now() + 1000 * 60 * 60,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hasedToken,
        forgotPasswordExpiry: Date.now() + 1000 * 60 * 60,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "d034442198dd2f",
        pass: "ddb2b99aeeace8",
      },
    });

    const mailOptions = {
      from: "akshat.agarwal9292@gmail.com",
      to: email,
      subject:
        emailType == "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.domain
      }/verifyemail?token=${hasedToken}">here</a> to ${
        emailType === "VERIFY" ? "Verify your main" : "resetyour password"
      }
      or copy and paste the link below in your browser<br>
      ${process.env.domain}/verifyemail?token=${hasedToken}
      </p>`,
    };

    const response = await transport.sendMail(mailOptions);
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};
