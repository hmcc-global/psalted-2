"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const mongoose_1 = require("mongoose");
const groupSchema = new mongoose_1.Schema({
    groupName: { type: String, required: true },
    userIds: [{ type: mongoose_1.Types.ObjectId, ref: 'User' }],
    setlistIds: [{ type: mongoose_1.Types.ObjectId, ref: 'Setlist' }],
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    lastUpdatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
const Group = mongoose_1.models.Group || (0, mongoose_1.model)('Group', groupSchema);
exports.Group = Group;
