"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const author_1 = require("../type-composers/author");
const authorQueries = {
    authors: author_1.AuthorTC.getResolver('findMany'),
    authorId: author_1.AuthorTC.getResolver('findById')
};
exports.default = authorQueries;
