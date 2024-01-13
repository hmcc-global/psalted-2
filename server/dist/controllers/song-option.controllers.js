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
exports.getSongOptionList = exports.getSongOption = exports.createSongOption = void 0;
const song_option_model_1 = require("../models/song-option.model");
const sendResponse = (res, statusCode, payload) => {
    return res.status(statusCode).json(payload);
};
const createSongOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const toCreate = __rest(req.body, []);
    if (Object.keys(toCreate).length > 0) {
        try {
            const data = yield song_option_model_1.SongOption.create(toCreate);
            if (data) {
                sendResponse(res, 200, data);
            }
            else {
                sendResponse(res, 404, 'Song option not created');
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
exports.createSongOption = createSongOption;
const getSongOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.params;
    // if there is category selected, get one category
    if (category) {
        try {
            const data = yield song_option_model_1.SongOption.findOne({
                category: category,
                isDeleted: false,
            });
            if (data) {
                sendResponse(res, 200, data);
            }
            else {
                sendResponse(res, 404, 'Song option not found');
            }
        }
        catch (error) {
            sendResponse(res, 500, error === null || error === void 0 ? void 0 : error.message);
        }
    }
    else {
        // or get all
        try {
            const data = yield song_option_model_1.SongOption.find({ isDeleted: false });
            if (data) {
                sendResponse(res, 200, data);
            }
            else {
                sendResponse(res, 404, 'Song options not found');
            }
        }
        catch (error) {
            sendResponse(res, 500, error === null || error === void 0 ? void 0 : error.message);
        }
    }
});
exports.getSongOption = getSongOption;
const getSongOptionList = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield song_option_model_1.SongOption.find({ isDeleted: false });
        if (data) {
            const result = {};
            for (const row of data) {
                result[row.category] = row.list;
            }
            sendResponse(res, 200, result);
        }
        else {
            sendResponse(res, 404, 'Song options not found');
        }
    }
    catch (error) {
        sendResponse(res, 500, error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.getSongOptionList = getSongOptionList;
