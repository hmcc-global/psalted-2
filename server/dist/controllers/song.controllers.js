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
exports.deleteSong = exports.updateSong = exports.getSongView = exports.getSong = exports.createSong = void 0;
const song_model_1 = require("../models/song.model");
const sendResponse = (res, statusCode, payload) => {
    return res.status(statusCode).json(payload);
};
const createSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const toCreate = __rest(req.body, []);
    if (Object.keys(toCreate).length > 0) {
        try {
            const data = yield song_model_1.Song.create(toCreate);
            if (data) {
                sendResponse(res, 200, data);
            }
            else {
                sendResponse(res, 404, 'Song not created');
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
exports.createSong = createSong;
const getSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: songId } = req.query;
    if (songId) {
        try {
            const data = yield song_model_1.Song.findOne({
                _id: songId,
                isDeleted: false,
            }).exec();
            if (data) {
                sendResponse(res, 200, data);
            }
            else {
                sendResponse(res, 404, 'Song not found');
            }
        }
        catch (error) {
            sendResponse(res, 500, error === null || error === void 0 ? void 0 : error.message);
        }
    }
    else {
        try {
            const data = yield song_model_1.Song.find({ isDeleted: false }).exec();
            if (data) {
                sendResponse(res, 200, data);
            }
            else {
                sendResponse(res, 404, 'Songs not found');
            }
        }
        catch (error) {
            sendResponse(res, 500, error === null || error === void 0 ? void 0 : error.message);
        }
    }
});
exports.getSong = getSong;
const getSongView = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = __rest(req.body, []);
    if (Object.keys(filter).length > 0) {
        //for future features, can share link with pre filtered songs, also needs to define req lol
    }
    else {
        try {
            const data = yield song_model_1.Song.find({ isDeleted: false })
                .select('_id title tempo originalKey themes artist year code lyricsPreview isVerified isDeleted createdAt updatedAt simplifiedChordLyrics timeSignature')
                .exec();
            if (data) {
                sendResponse(res, 200, data);
            }
            else {
                sendResponse(res, 404, 'Songs not found');
            }
        }
        catch (error) {
            sendResponse(res, 500, error === null || error === void 0 ? void 0 : error.message);
        }
    }
});
exports.getSongView = getSongView;
const updateSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { id: songId } = _a, toUpdate = __rest(_a, ["id"]);
    if (songId && Object.keys(toUpdate).length > 0) {
        try {
            const updatedSong = yield song_model_1.Song.updateOne({ _id: songId, isDeleted: false }, { $set: toUpdate });
            if (updatedSong) {
                sendResponse(res, 200, 'Song updated');
            }
            else {
                sendResponse(res, 404, 'Song not updated');
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
exports.updateSong = updateSong;
const deleteSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: songId } = req.query;
    if (songId) {
        try {
            yield song_model_1.Song.updateOne({ _id: songId, isDeleted: false }, { $set: { isDeleted: true } });
            sendResponse(res, 200, 'Song successfully deleted');
        }
        catch (error) {
            sendResponse(res, 500, error === null || error === void 0 ? void 0 : error.message);
        }
    }
    else {
        sendResponse(res, 400, 'Missing required fields');
    }
});
exports.deleteSong = deleteSong;
