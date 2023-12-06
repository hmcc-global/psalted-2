"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoutes = void 0;
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user.routes"));
const song_routes_1 = __importDefault(require("./song.routes"));
const group_routes_1 = __importDefault(require("./group.routes"));
const setlist_routes_1 = __importDefault(require("./setlist.routes"));
const getRoutes = () => {
    const router = (0, express_1.Router)();
    router.use('/users', user_routes_1.default);
    router.use('/songs', song_routes_1.default);
    router.use('/groups', group_routes_1.default);
    router.use('/setlist', setlist_routes_1.default);
    return router;
};
exports.getRoutes = getRoutes;
