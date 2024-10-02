import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailtemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  console.log(email)

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.log(`Error sending verification Email: ${error}`);
    throw new Error(`Error sending verification Email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "34a1f2ef-888f-47bf-9d34-67c262a7ea4f",
      template_variables: {
        company_info_name: "Hack The Matrix",
        name: name,
        company_info_address: "Chakia",
        company_info_city: "East Champaran",
        company_info_zip_code: "845426",
        company_info_country: "India",
      },
    });

    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.log(`Error sending Welcome Email: ${error}`);
    throw new Error(`Error sending Welcome Email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password reset",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.log(`Error sending reset Email: ${error}`);
    throw new Error(`Error sending reset Email: ${error}`);
  }
}

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password reset successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password reset success",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.log(`Error sending password reset success Email: ${error}`);
    throw new Error(`Error sending password reset success Email: ${error}`);
  }
}
