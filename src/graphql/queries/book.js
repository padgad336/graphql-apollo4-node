"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const book_1 = require("../type-composers/book");
const bookQueries = {
    books: book_1.BookTC.getResolver('findMany'),
    bookId: book_1.BookTC.getResolver('findById')
};
exports.default = bookQueries;
