"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PWD_RESET_TOKEN_TTL = exports.JWT_MAX_AGE = exports.JWT_MIN_AGE = void 0;
exports.JWT_MIN_AGE = 24 * 60 * 60; // token stays for 1 day (1 sec increment)
exports.JWT_MAX_AGE = 24 * 60 * 60 * 7 * 8; // token stays for 2 month (1 sec increment)
exports.PWD_RESET_TOKEN_TTL = 60 * 60 * 1000; // 1 hour in milliseconds
