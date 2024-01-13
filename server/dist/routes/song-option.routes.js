"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const song_option_controllers_1 = require("../controllers/song-option.controllers");
const express_1 = require("express");
const songOptionRouter = (0, express_1.Router)();
songOptionRouter.post('/create', song_option_controllers_1.createSongOption);
songOptionRouter.post('/get', song_option_controllers_1.getSongOption);
songOptionRouter.get('/list', song_option_controllers_1.getSongOptionList);
exports.default = songOptionRouter;
