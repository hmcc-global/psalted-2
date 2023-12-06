"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Song = void 0;
const mongoose_1 = require("mongoose");
const songSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    tempo: [{ type: String, required: true }],
    originalKey: { type: String, required: true },
    themes: [{ type: String, required: true }],
    artist: { type: String, required: true },
    year: { type: String, required: true },
    code: { type: String, required: true },
    lyricsPreview: { type: String, required: true },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    lastUpdatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    isVerified: { type: Boolean, default: false },
    chordLyrics: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
const Song = mongoose_1.models.Song || (0, mongoose_1.model)('Song', songSchema);
exports.Song = Song;
