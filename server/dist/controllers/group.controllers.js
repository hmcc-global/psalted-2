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
exports.deleteGroup = exports.updateGroup = exports.getGroup = exports.createGroup = void 0;
const group_model_1 = require("../models/group.model");
const sendResponse = (res, statusCode, payload) => {
    return res.status(statusCode).json(payload);
};
const createGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const toCreate = __rest(req.body, []);
    // Check if any fields are present. MongoDB will throw an error
    // if no fields are present or if a required field is missing
    if (Object.keys(toCreate).length > 0) {
        try {
            const data = yield group_model_1.Group.create(toCreate);
            if (data) {
                sendResponse(res, 200, data);
            }
            else {
                sendResponse(res, 404, 'Group not created');
            }
        }
        catch (error) {
            sendResponse(res, 500, error === null || error === void 0 ? void 0 : error.message);
        }
    }
    sendResponse(res, 400, 'Missing required fields');
});
exports.createGroup = createGroup;
const getGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: groupId } = req.params;
    // Get group by id
    if (groupId) {
        try {
            const data = yield group_model_1.Group.findOne({
                _id: groupId,
                isDeleted: false,
            });
            if (data) {
                sendResponse(res, 200, data);
            }
            else {
                sendResponse(res, 404, 'Group not found');
            }
        }
        catch (error) {
            sendResponse(res, 500, error === null || error === void 0 ? void 0 : error.message);
        }
    }
    // If no id, get all groups
    try {
        const data = yield group_model_1.Group.find({ isDeleted: false });
        if (data) {
            sendResponse(res, 200, data);
        }
        else {
            sendResponse(res, 404, 'Users not found');
        }
    }
    catch (error) {
        sendResponse(res, 500, error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.getGroup = getGroup;
const updateGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { id: groupId } = _a, toUpdate = __rest(_a, ["id"]);
    // Update group by id with fields to update
    if (groupId && Object.keys(toUpdate).length > 0) {
        try {
            const updatedGroup = yield group_model_1.Group.updateOne({ _id: groupId, isDeleted: false }, { $set: toUpdate });
            if (updatedGroup) {
                sendResponse(res, 200, 'Group updated');
            }
            else {
                sendResponse(res, 404, 'Group not updated');
            }
        }
        catch (error) {
            sendResponse(res, 500, error === null || error === void 0 ? void 0 : error.message);
        }
    }
    sendResponse(res, 400, 'Missing required fields');
});
exports.updateGroup = updateGroup;
const deleteGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: groupId } = req.params;
    // Soft delete group by id
    if (groupId) {
        try {
            yield group_model_1.Group.updateOne({ _id: groupId, isDeleted: false }, { $set: { isDeleted: true } });
            sendResponse(res, 200, 'Group deleted');
        }
        catch (error) {
            sendResponse(res, 500, error === null || error === void 0 ? void 0 : error.message);
        }
    }
    else {
        sendResponse(res, 400, 'Missing required fields');
    }
});
exports.deleteGroup = deleteGroup;
