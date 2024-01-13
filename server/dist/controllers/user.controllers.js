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
exports.changePassword = exports.deleteUser = exports.updateUser = exports.getUser = exports.createUser = void 0;
const user_model_1 = require("../models/user.model");
const auth_utils_1 = require("../utils/auth.utils");
const sendResponse = (res, statusCode, payload) => {
    return res.status(statusCode).json(payload);
};
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const toCreate = __rest(req.body, []);
    if (Object.keys(toCreate).length > 0) {
        try {
            toCreate.password = yield (0, auth_utils_1.hashInput)(toCreate.password);
            const data = yield user_model_1.User.create(toCreate);
            if (data) {
                sendResponse(res, 200, data);
            }
            else {
                sendResponse(res, 404, 'User not created');
            }
        }
        catch (error) {
            sendResponse(res, 500, error === null || error === void 0 ? void 0 : error.message);
        }
    }
    else {
        sendResponse(res, 400, 'Missing required fields');
    }
});
exports.createUser = createUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: userId } = req.query;
    if (userId) {
        try {
            const data = yield user_model_1.User.findOne({ _id: userId, isDeleted: false });
            if (data) {
                sendResponse(res, 200, data);
            }
            else {
                sendResponse(res, 404, 'User not found');
            }
        }
        catch (error) {
            sendResponse(res, 500, error === null || error === void 0 ? void 0 : error.message);
        }
    }
    else {
        try {
            const data = yield user_model_1.User.find({ isDeleted: false });
            if (data) {
                sendResponse(res, 200, data);
            }
            else {
                sendResponse(res, 404, 'Users not found');
            }
        }
        catch (error) {
            sendResponse(res, 500, error === null || error === void 0 ? void 0 : error.message);
        }
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { id: userId } = _a, toUpdate = __rest(_a, ["id"]);
    if (userId && Object.keys(toUpdate).length > 0) {
        try {
            const data = yield user_model_1.User.findOneAndUpdate({ _id: userId, isDeleted: false }, { $set: toUpdate }, {
                upsert: true,
                new: true,
            });
            if (data) {
                sendResponse(res, 200, data);
            }
            else {
                sendResponse(res, 404, 'User not found');
            }
        }
        catch (error) {
            sendResponse(res, 500, error === null || error === void 0 ? void 0 : error.message);
        }
    }
    else {
        sendResponse(res, 400, 'Missing required fields');
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: userId } = req.params;
    if (userId) {
        try {
            yield user_model_1.User.updateOne({ _id: userId, isDeleted: false }, { $set: { isDeleted: true } });
            sendResponse(res, 200, 'User successfully deleted');
        }
        catch (error) {
            sendResponse(res, 500, error === null || error === void 0 ? void 0 : error.message);
        }
    }
    else {
        sendResponse(res, 400, 'Missing required fields');
    }
});
exports.deleteUser = deleteUser;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, currentPassword, newPassword } = req.body;
    if (id && currentPassword && newPassword) {
        try {
            const userRecord = yield user_model_1.User.findOne({ _id: id, isDeleted: false });
            if (!userRecord) {
                sendResponse(res, 401, 'No userId found');
                return;
            }
            const hashedCurr = yield (0, auth_utils_1.hashInput)(currentPassword);
            const isPasswordValid = yield (0, auth_utils_1.validateInput)(hashedCurr, userRecord.password);
            if (isPasswordValid) {
                yield user_model_1.User.updateOne({ _id: id, isDeleted: false }).set({
                    password: yield (0, auth_utils_1.hashInput)(newPassword),
                });
                sendResponse(res, 200, 'Successfully changed password!');
            }
            else {
                sendResponse(res, 401, 'Invalid Password');
            }
        }
        catch (error) {
            sendResponse(res, 500, 'Failed to process change password request');
        }
    }
    else {
        sendResponse(res, 422, 'Missing required fields');
    }
});
exports.changePassword = changePassword;
