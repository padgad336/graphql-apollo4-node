"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const book_1 = require("../type-composers/book");
const bookMutations = {
    createBook: book_1.BookTC.getResolver('createOne'),
    updateBook: book_1.BookTC.getResolver('updateById'),
    removeBook: book_1.BookTC.getResolver('removeById'),
};
exports.default = bookMutations;
