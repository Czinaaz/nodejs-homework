const mailgun = require('mailgun-js')({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });

const sendVerificationEmail = async (user) => {
    const verificationLink = `${process.env.APP_URL}/api/auth/verify/${user.verificationToken}`;
    const msg = {
      to: user.email,
      from: process.env.MAILGUN_EMAIL_FROM,
      subject: 'Verify your email',
      text: `Hello ${user.name},\n\nPlease verify your email by clicking on the following link: ${verificationLink}`,
    };
  
    await mailgun.messages().send(msg);
  };

module.exports = { sendVerificationEmail };