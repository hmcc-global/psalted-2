import nodemailer from 'nodemailer';
import path from 'path';
import ejs from 'ejs';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_FROM,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

const compileEmailTemplate = async (
  templatePath: string,
  layoutPath: string,
  data: object
): Promise<string> => {
  try {
    const emailTemplatePath = path.join('views/emails', `${templatePath}.ejs`);
    const layoutTemplatePath = path.join('views/layouts', `${layoutPath}.ejs`);

    const emailContent = await ejs.renderFile(emailTemplatePath, data);
    const layoutContent = await ejs.renderFile(layoutTemplatePath, { body: emailContent });

    return layoutContent;
  } catch (error) {
    console.error('Error compiling email template:', error);
    throw new Error('Failed to compile email template');
  }
};

const sendTemplateEmail = async (
  to: string,
  subject: string,
  template: string,
  templateData: object,
  layout?: string
): Promise<void> => {
  try {
    const layoutPath = layout || 'layout-email'; // layout-email.ejs is the default layout

    const htmlEmailContents = await compileEmailTemplate(template, layoutPath, templateData);

    if (process.env.NODE_ENV === 'test') {
      console.log('Skipped sending email (test environment):');
      console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
      console.log('To:', to);
      console.log('Subject:', subject);
      console.log('Body:', htmlEmailContents);
      console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
      return; // Stop further execution in test environment
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html: htmlEmailContents,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    console.log('Successfully sent email!');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

export { sendTemplateEmail };
