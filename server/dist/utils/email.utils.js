"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTemplateEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const transporter = nodemailer_1.default.createTransport({
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
const compileEmailTemplate = (templatePath, layoutPath, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailTemplatePath = path_1.default.join(__dirname, '..', 'views', 'emails', `${templatePath}.ejs`);
        const layoutTemplatePath = path_1.default.join(__dirname, '..', 'views', 'layouts', `${layoutPath}.ejs`);
        const emailContent = yield ejs_1.default.renderFile(emailTemplatePath, data);
        const layoutContent = yield ejs_1.default.renderFile(layoutTemplatePath, { body: emailContent });
        return layoutContent;
    }
    catch (error) {
        console.error('Error compiling email template:', error);
        throw new Error('Failed to compile email template');
    }
});
const sendTemplateEmail = (to, subject, template, templateData, layout) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const layoutPath = layout || 'layout-email'; // layout-email.ejs is the default layout
        const htmlEmailContents = yield compileEmailTemplate(template, layoutPath, templateData);
        // Don't send email in test environment
        if (((_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.trim()) === 'test') {
            console.log('Skipped sending email (test environment):');
            console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
            console.log('To:', to);
            console.log('Subject:', subject);
            console.log('Body:', htmlEmailContents);
            console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
            return;
        }
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to,
            subject,
            html: htmlEmailContents,
        };
        const info = yield transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        console.log('Successfully sent email!');
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
});
exports.sendTemplateEmail = sendTemplateEmail;
