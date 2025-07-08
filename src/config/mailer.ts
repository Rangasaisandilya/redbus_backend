import sgMail from '@sendgrid/mail';
import { env } from './envConfig';



process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

sgMail.setApiKey(env.EMAIL_API_KEY)

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html?: string
): Promise<void> => {
  const msg = {
    to,
    from: 'gesaxik338@kimdyn.com',
    subject,
    text,
    html: html || `<p>${text}</p>`,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};