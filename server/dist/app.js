"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("./mongoose");
const routes_1 = require("./routes");
const path = __importStar(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const port = process.env.PORT ? parseInt(process.env.PORT) : 1337; // development port is 1337
dotenv_1.default.config();
// Use EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express_1.default.json());
app.use('/api', (0, routes_1.getRoutes)());
// Starts the server after connecting to the database
(0, mongoose_1.connectToDB)()
    .then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}.`);
    });
})
    .catch(() => {
    console.log('Server failed to start.');
});
