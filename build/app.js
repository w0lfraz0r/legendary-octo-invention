"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookRouter_1 = __importDefault(require("./routers/bookRouter"));
const cors = require("cors");
const app = (0, express_1.default)();
app.use(cors());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin,Cache-Control,Accept,X-Access-Token ,X-Requested-With, Content-Type, Access-Control-Request-Method");
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/books", bookRouter_1.default);
exports.default = app;
