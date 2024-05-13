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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class DBPrismaService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    getBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            const foundBooks = yield this.prisma.book.findMany();
            return foundBooks;
        });
    }
    insertBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdBook = yield this.prisma.book.create({ data: book });
            return createdBook;
        });
    }
    getBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundBook = yield this.prisma.book.findUniqueOrThrow({
                where: {
                    id: id,
                },
            });
            return foundBook;
        });
    }
    updateBookById(id, book) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new Map();
            Object.keys(book).forEach((key) => {
                const value = book[key];
                if (value) {
                    data.set(key, value);
                }
            });
            const updatedBook = yield this.prisma.book.update({
                where: {
                    id: id,
                },
                data: Object.fromEntries(data),
            });
            return updatedBook;
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.book.delete({
                where: {
                    id: id,
                },
            });
            return;
        });
    }
}
exports.default = new DBPrismaService();
