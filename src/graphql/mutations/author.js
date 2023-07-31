"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const author_1 = require("../type-composers/author");
const authorMutations = {
    createAuthor: author_1.AuthorTC.getResolver('createOne'),
    updateAuthor: author_1.AuthorTC.getResolver('updateById'),
    removeAuthor: author_1.AuthorTC.getResolver('removeById'),
};
exports.default = authorMutations;
