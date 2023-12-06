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
exports.deleteSetlist = exports.updateSetlist = exports.getSetlist = exports.createSetlist = void 0;
const setlist_model_1 = require("../models/setlist.model");
const sendResponse = (res, statusCode, payload) => {
    return res.status(statusCode).json(payload);
};
const createSetlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const toCreate = __rest(req.body, []);
    const defaultUrl = req.protocol + '://' + req.get('host') + '/setlist/';
    if (Object.keys(toCreate).length > 0) {
        try {
            const tempData = yield setlist_model_1.Setlist.create(toCreate);
            const tempId = tempData._id.toString();
            // this is to set the default url of the public link to setlist/:id,
            // and to setlist/custom-name if the user define a custom link name
            const setlistUrl = toCreate.publicLink
                ? defaultUrl + toCreate.publicLink
                : defaultUrl + tempId;
            const data = yield setlist_model_1.Setlist.updateOne({ _id: tempId, isDeleted: false }, Object.assign(Object.assign({}, toCreate), { publicLink: setlistUrl }));
            if (data) {
                sendResponse(res, 200, 'Setlist created');
            }
            else {
                sendResponse(res, 404, 'Setlist not created');
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
exports.createSetlist = createSetlist;
const getSetlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: setlistId } = req.params;
    if (setlistId) {
        try {
            const data = yield setlist_model_1.Setlist.findOne({
                _id: setlistId,
                isDeleted: false,
            }).exec();
            if (data) {
                sendResponse(res, 200, data);
            }
            else {
                sendResponse(res, 404, 'Setlist not found');
            }
        }
        catch (error) {
            sendResponse(res, 500, error === null || error === void 0 ? void 0 : error.message);
        }
    }
    else {
        try {
            const data = yield setlist_model_1.Setlist.find({ isDeleted: false }).exec();
            if (data) {
                sendResponse(res, 200, data);
            }
            else {
                sendResponse(res, 404, 'Setlists not found');
            }
        }
        catch (error) {
            sendResponse(res, 500, error === null || error === void 0 ? void 0 : error.message);
        }
    }
});
exports.getSetlist = getSetlist;
const updateSetlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { id: setlistId } = _a, toUpdate = __rest(_a, ["id"]);
    if (setlistId && Object.keys(toUpdate).length > 0) {
        try {
            const updatedSetlist = yield setlist_model_1.Setlist.updateOne({ _id: setlistId, isDeleted: false }, toUpdate, {
                upsert: true,
                new: true,
            });
            if (updatedSetlist) {
                sendResponse(res, 200, 'Setlist updated');
            }
            else {
                sendResponse(res, 404, 'Setlist not found');
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
exports.updateSetlist = updateSetlist;
const deleteSetlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: setlistId } = req.params;
    if (setlistId) {
        try {
            const data = yield setlist_model_1.Setlist.updateOne({ _id: setlistId, isDeleted: false }, { isDeleted: true });
            if (data) {
                sendResponse(res, 200, 'Setlist deleted');
            }
            else {
                sendResponse(res, 404, 'Setlist not found');
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
exports.deleteSetlist = deleteSetlist;
