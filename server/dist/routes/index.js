"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoutes = void 0;
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const group_routes_1 = __importDefault(require("./group.routes"));
const setlist_routes_1 = __importDefault(require("./setlist.routes"));
const song_routes_1 = __importDefault(require("./song.routes"));
const song_option_routes_1 = __importDefault(require("./song-option.routes"));
const getRoutes = () => {
    const router = (0, express_1.Router)();
    router.use('/auth', auth_routes_1.default);
    router.use('/users', user_routes_1.default);
    router.use('/groups', group_routes_1.default);
    router.use('/setlists', setlist_routes_1.default);
    router.use('/songs', song_routes_1.default);
    router.use('/song-options', song_option_routes_1.default);
    return router;
};
exports.getRoutes = getRoutes;
