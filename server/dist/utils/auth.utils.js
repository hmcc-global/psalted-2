"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.verifyGoogleToken = exports.verifyJwt = exports.generateJwt = exports.generateRandomToken = exports.validateInput = exports.hashInput = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const jwt = __importStar(require("jsonwebtoken"));
const constants_1 = require("../constants");
const user_model_1 = require("../models/user.model");
const hashInput = function (input) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcryptjs_1.default.genSalt(10);
        return yield bcryptjs_1.default.hash(input, salt);
    });
};
exports.hashInput = hashInput;
const validateInput = function (input, hashedInput) {
    return bcryptjs_1.default.compare(input, hashedInput);
};
exports.validateInput = validateInput;
const generateRandomToken = (length) => {
    return crypto_1.default.randomBytes(length || 32).toString('hex');
};
exports.generateRandomToken = generateRandomToken;
const generateJwt = (userId, email, accessType, isRememberPassword) => {
    try {
        return jwt.sign({
            id: userId,
            emailAddress: email,
            accessType: accessType,
        }, process.env.JWT_KEY, { expiresIn: isRememberPassword ? constants_1.JWT_MAX_AGE : constants_1.JWT_MIN_AGE });
    }
    catch (error) {
        throw new Error('Invalid token or no authentication present');
    }
};
exports.generateJwt = generateJwt;
const verifyJwt = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (token == null || token === '') {
        throw new Error('Unauthorized');
    }
    try {
        const valid = jwt.verify(token, process.env.JWT_KEY);
        if (valid == null)
            throw new Error('Forbidden');
        // at this point should return a user object
        // with id, email and accessType
        const userObj = yield user_model_1.User.findOne({ _id: valid.id })
            .select('-createdAt -updatedAt -password')
            .exec();
        if (!userObj)
            throw new Error('Unauthorized');
        return userObj;
    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error('Token expired');
        }
        throw new Error('Invalid token');
    }
});
exports.verifyJwt = verifyJwt;
const verifyGoogleToken = (client, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticket = yield client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (payload === undefined) {
            throw new Error('Google token verification failed');
        }
        else {
            return payload;
        }
    }
    catch (error) {
        throw new Error('Google token verification failed');
    }
});
exports.verifyGoogleToken = verifyGoogleToken;
