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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.resetPassword = exports.forgotPassword = exports.signupGoogle = exports.signup = exports.loginGoogle = exports.login = void 0;
const user_model_1 = require("../models/user.model");
const auth_model_1 = require("../models/auth.model");
const auth_utils_1 = require("../utils/auth.utils");
const google_auth_library_1 = require("google-auth-library");
const email_utils_1 = require("../utils/email.utils");
const constants_1 = require("../constants");
const sendResponse = (res, statusCode, payload) => {
    return res.status(statusCode).json(payload);
};
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const credentials = req.body;
    if (Object.keys(credentials).length > 0 &&
        credentials.email &&
        credentials.password &&
        credentials.isRememberPassword !== undefined &&
        credentials.isRememberPassword !== null) {
        try {
            const userRecord = yield user_model_1.User.findOne({
                email: credentials.email.toLowerCase(),
            });
            if (!userRecord) {
                sendResponse(res, 401, 'Invalid login credentials');
                return;
            }
            const isPasswordValid = yield (0, auth_utils_1.validateInput)(credentials.password, userRecord.password);
            if (isPasswordValid) {
                const token = yield (0, auth_utils_1.generateJwt)(userRecord._id, userRecord.email, userRecord.accessType, credentials.isRememberPassword);
                sendResponse(res, 200, token);
            }
            else {
                sendResponse(res, 401, 'Invalid login credentials');
            }
        }
        catch (error) {
            sendResponse(res, 500, error === null || error === void 0 ? void 0 : error.message);
        }
    }
    else {
        sendResponse(res, 422, 'Missing required fields');
    }
});
exports.login = login;
const loginGoogle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tokenId } = req.body;
    if (tokenId) {
        const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        try {
            const data = yield (0, auth_utils_1.verifyGoogleToken)(client, tokenId);
            if (data && data.email && data.name) {
                const { email } = data;
                const newEmail = email.toLowerCase();
                const userRecord = yield user_model_1.User.findOne({ email: newEmail }).exec();
                if (userRecord && userRecord.password !== '') {
                    const token = yield (0, auth_utils_1.generateJwt)(userRecord._id, userRecord.email, userRecord.accessType, true); // always remember password for google login
                    sendResponse(res, 200, token);
                }
                else {
                    sendResponse(res, 401, 'The provided email address is not registered');
                }
            }
        }
        catch (_a) {
            sendResponse(res, 500, 'Google token verification failed');
        }
    }
    else {
        sendResponse(res, 422, 'Missing Token ID');
    }
});
exports.loginGoogle = loginGoogle;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const toCreate = __rest(req.body, []);
    if (Object.keys(toCreate).length > 0 &&
        toCreate.password &&
        toCreate.email &&
        toCreate.fullName) {
        try {
            toCreate.email = toCreate.email.toLowerCase();
            toCreate.password = yield (0, auth_utils_1.hashInput)(toCreate.password);
            const data = yield user_model_1.User.create(toCreate);
            if (data) {
                sendResponse(res, 200, data);
            }
            else {
                sendResponse(res, 404, 'User account was not successfully created');
            }
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
                sendResponse(res, 422, 'Missing required fields');
            }
            else if ((error === null || error === void 0 ? void 0 : error.code) === 11000) {
                sendResponse(res, 409, 'The provided email address is already in use');
            }
            else {
                sendResponse(res, 500, error === null || error === void 0 ? void 0 : error.message);
            }
        }
    }
    else {
        sendResponse(res, 422, 'Missing required fields');
    }
});
exports.signup = signup;
const signupGoogle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tokenId } = req.body;
    if (tokenId) {
        const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        try {
            const data = yield (0, auth_utils_1.verifyGoogleToken)(client, tokenId);
            if (data && data.email && data.name) {
                const { email, name: fullName } = data;
                const newEmail = email.toLowerCase();
                const userRecord = yield user_model_1.User.findOne({ email: newEmail }).exec();
                if (userRecord) {
                    sendResponse(res, 409, 'The provided email address is already in use');
                }
                const payload = { email: newEmail, fullName: fullName };
                sendResponse(res, 200, payload);
            }
        }
        catch (_b) {
            sendResponse(res, 500, 'Google token verification failed');
        }
    }
    else {
        sendResponse(res, 422, 'Missing Token ID');
    }
});
exports.signupGoogle = signupGoogle;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (email) {
        const newEmail = email.toLowerCase();
        const userRecord = yield user_model_1.User.findOne({ email: newEmail }).exec();
        if (!userRecord) {
            sendResponse(res, 200, 'The email address might have matched a user in the database.  (If so, a recovery email was sent.)');
            return;
        }
        // Delete any existing reset password tokens for this email to avoid breaking unique constraint
        auth_model_1.ResetPwdToken.findOneAndDelete({ email: newEmail }).exec();
        const resetToken = (0, auth_utils_1.generateRandomToken)(32);
        const hashedResetToken = yield (0, auth_utils_1.hashInput)(resetToken);
        const resetPwdToken = {
            email: newEmail,
            token: hashedResetToken,
            expireAt: new Date(Date.now() + constants_1.PWD_RESET_TOKEN_TTL), // expires 24 hours from time of token creation
        };
        const data = yield auth_model_1.ResetPwdToken.create(resetPwdToken);
        if (!data) {
            sendResponse(res, 500, 'Failed to create reset password token');
            return;
        }
        const resetPwdUrl = `${process.env.BASE_URL}/password/new?email=${newEmail}&token=${resetToken}`;
        const templateData = {
            fullName: userRecord === null || userRecord === void 0 ? void 0 : userRecord.fullName,
            resetUrl: resetPwdUrl,
        };
        try {
            yield (0, email_utils_1.sendTemplateEmail)(newEmail, 'Password Reset Instructions', 'email-reset-password', templateData, 'layout-email');
            sendResponse(res, 200, 'Successfully sent reset password email!');
        }
        catch (error) {
            sendResponse(res, 500, 'Failed to process reset password request');
        }
    }
    else {
        sendResponse(res, 422, 'Missing required fields');
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, token, password } = req.body;
    if (email && token && password) {
        try {
            const resetPwdTokenRecord = yield auth_model_1.ResetPwdToken.findOne({
                email: email,
            });
            if (!resetPwdTokenRecord) {
                sendResponse(res, 401, 'No password reset token found');
                return;
            }
            const isTokenValid = yield (0, auth_utils_1.validateInput)(token, resetPwdTokenRecord.token);
            // Token may have been used but not expired yet
            if (isTokenValid &&
                !resetPwdTokenRecord.isUsed &&
                resetPwdTokenRecord.expireAt &&
                resetPwdTokenRecord.expireAt >= new Date()) {
                yield user_model_1.User.updateOne({ email: resetPwdTokenRecord.email }, { $set: { password: yield (0, auth_utils_1.hashInput)(password) } });
                yield auth_model_1.ResetPwdToken.updateOne({ email: email }, { $set: { isUsed: true } });
                sendResponse(res, 200, 'Successfully reset password!');
            }
            else {
                sendResponse(res, 401, 'Invalid or expired reset password token');
            }
        }
        catch (error) {
            console.log(error);
            sendResponse(res, 500, 'Failed to process reset password request');
        }
    }
    else {
        sendResponse(res, 422, 'Missing required fields');
    }
});
exports.resetPassword = resetPassword;
const verifyToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    if (token && token !== '') {
        try {
            const validUserObject = yield (0, auth_utils_1.verifyJwt)(token);
            sendResponse(res, 200, validUserObject);
        }
        catch (error) {
            sendResponse(res, 401, 'Invalid token');
        }
    }
    else {
        sendResponse(res, 401, 'Unauthorized');
    }
});
exports.verifyToken = verifyToken;
