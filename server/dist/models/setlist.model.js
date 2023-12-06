"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Setlist = void 0;
const mongoose_1 = require("mongoose");
const setlistSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    date: { type: Date },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    songs: [{ type: mongoose_1.Types.ObjectId, ref: 'Song' }],
    lastUpdatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    publicLink: { type: String, required: true, unique: true },
    groupIds: [{ type: mongoose_1.Types.ObjectId, ref: 'Group' }],
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
const Setlist = mongoose_1.models.Setlist || (0, mongoose_1.model)('Setlist', setlistSchema);
exports.Setlist = Setlist;
