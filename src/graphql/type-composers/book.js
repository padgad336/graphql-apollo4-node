"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookTC = void 0;
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const models_1 = require("../../models");
const author_1 = require("./author");
exports.BookTC = (0, graphql_compose_mongoose_1.composeWithMongoose)(models_1.BookModel);
exports.BookTC.addRelation('author', {
    resolver: () => author_1.AuthorTC.getResolver('findById'),
    prepareArgs: {
        _id: (source) => source.author,
    },
    projection: { author: true },
});
