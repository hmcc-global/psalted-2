"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongOption = void 0;
const mongoose_1 = require("mongoose");
const songOptionSchema = new mongoose_1.Schema({
    category: { type: String, required: true },
    list: [{ type: String, required: true }],
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    lastUpdatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
const SongOption = mongoose_1.models.SongOption || (0, mongoose_1.model)('SongOption', songOptionSchema);
exports.SongOption = SongOption;
