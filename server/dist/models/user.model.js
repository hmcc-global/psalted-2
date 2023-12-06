"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accessType: { type: String, enum: ['admin', 'normal'], default: 'normal' },
    groupIds: [{ type: mongoose_1.Types.ObjectId, ref: 'Group' }],
    setlistIds: [{ type: mongoose_1.Types.ObjectId, ref: 'Setlist' }],
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
const User = mongoose_1.models.User || (0, mongoose_1.model)('User', userSchema);
exports.User = User;
