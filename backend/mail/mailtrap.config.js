import { MailtrapClient } from "mailtrap";

const TOKEN = "e709dca23613d9053cf711e8db47723f";

export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "MMM",
};
