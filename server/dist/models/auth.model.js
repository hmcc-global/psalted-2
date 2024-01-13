"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPwdToken = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../constants");
const resetPwdTokenSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    token: { type: String, required: true },
    expireAt: { type: Date, default: () => new Date(Date.now() + constants_1.PWD_RESET_TOKEN_TTL) },
    isUsed: { type: Boolean, default: false }, // for tokens that have been used but not yet expired
});
// Expire at the specified date
resetPwdTokenSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
const ResetPwdToken = mongoose_1.models.ResetPwdToken || (0, mongoose_1.model)('ResetPwdToken', resetPwdTokenSchema);
exports.ResetPwdToken = ResetPwdToken;
