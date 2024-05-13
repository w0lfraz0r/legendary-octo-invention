"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = __importDefault(require("../controllers/bookController"));
const bookRouter = express_1.default.Router();
bookRouter.get("/", bookController_1.default.getBooks);
bookRouter.get("/:id", bookController_1.default.getBookById);
bookRouter.post("/", bookController_1.default.insertBook);
bookRouter.put("/:id", bookController_1.default.updateBookById);
bookRouter.delete("/:id", bookController_1.default.deleteBookById);
exports.default = bookRouter;
