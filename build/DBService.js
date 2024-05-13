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
const pg_1 = require("pg");
class DBService {
    constructor() {
        this.pool = new pg_1.Pool({
            connectionString: "postgresql://api1_owner:q4lzNG0nPUeg@ep-damp-water-a1cywtj4.ap-southeast-1.aws.neon.tech/api1?sslmode=require"
        });
    }
    getBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool.query("SELECT * FROM book");
            return result.rows;
        });
    }
    getBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool.query("SELECT * FROM book WHERE id = $1", [
                id,
            ]);
            return result.rows[0];
        });
    }
    insertBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.query("INSERT INTO book (title, author, published) VALUES ($1, $2, $3)", [book.title, book.author, book.published]);
            return;
        });
    }
    updateBookById(id, book) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = "UPDATE book SET ";
            if (book.title !== undefined)
                query += `title = '${book.title}', `;
            if (book.author !== undefined)
                query += `author = '${book.author}', `;
            if (book.published !== undefined)
                query += `published = ${book.published} `;
            query += `WHERE id = ${id}`;
            yield this.pool.query(query);
            const updatedBook = yield this.getBookById(id);
            return updatedBook;
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool.query("DELETE FROM book WHERE id = $1", [id]);
            return;
        });
    }
}
exports.default = new DBService();
