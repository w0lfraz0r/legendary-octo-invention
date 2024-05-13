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
const express_1 = __importDefault(require("express"));
const dbPrismaService_1 = __importDefault(require("./dbPrismaService"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
app.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield dbPrismaService_1.default.getBooks();
    res.status(200).json(books);
}));
app.get("/books/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const foundBook = yield dbPrismaService_1.default.getBookById(Number(id));
    res.status(200).json(foundBook);
}));
app.post("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, published } = req.body;
    const newBook = yield dbPrismaService_1.default.insertBook({ title, author, published });
    res.status(201).json(newBook);
}));
app.put("/books/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, published } = req.body;
    const { id } = req.params;
    const updatedBook = { title, author, published };
    const result = yield dbPrismaService_1.default.updateBookById(Number(id), updatedBook);
    res.status(200).json(result);
}));
app.delete("/books/:id", (req, res) => {
    const { id } = req.params;
    dbPrismaService_1.default.deleteBook(Number(id));
    res.sendStatus(200);
});
app.listen(port, () => {
    console.log(`Server started listening on port ${port}`);
});
