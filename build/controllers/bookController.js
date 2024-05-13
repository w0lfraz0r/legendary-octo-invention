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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbPrismaService_1 = __importDefault(require("../services/dbPrismaService"));
class BookController {
    getBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield dbPrismaService_1.default.getBooks();
            res.status(200).json(books);
        });
    }
    getBookById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const foundBook = yield dbPrismaService_1.default.getBookById(Number(id));
            res.status(200).json(foundBook);
        });
    }
    insertBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, author, published } = req.body;
            const newBook = yield dbPrismaService_1.default.insertBook({
                title,
                author,
                published,
            });
            res.status(201).json(newBook);
        });
    }
    updateBookById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, author, published } = req.body;
            const { id } = req.params;
            const updatedBook = { title, author, published };
            const result = yield dbPrismaService_1.default.updateBookById(Number(id), updatedBook);
            res.status(200).json(result);
        });
    }
    deleteBookById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            dbPrismaService_1.default.deleteBook(Number(id));
            res.sendStatus(200);
        });
    }
}
exports.default = new BookController();
